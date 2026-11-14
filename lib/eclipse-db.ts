import { Pool, PoolClient } from "pg";

export type EclipseColor = "black" | "espresso";
export type EclipseSize = "S" | "M" | "L" | "XL";
type OrderStatus = "reserved" | "paid" | "processing" | "expired" | "failed";

const globalDb = globalThis as typeof globalThis & { __eclipseDb?: Pool };

export function getEclipseDb(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Eclipse order database is not configured");
  if (!globalDb.__eclipseDb) {
    globalDb.__eclipseDb = new Pool({
      connectionString,
      max: 5,
      connectionTimeoutMillis: 7000,
      idleTimeoutMillis: 15000,
      ssl: connectionString.includes("sslmode=") ? undefined : { rejectUnauthorized: true },
    });
  }
  return globalDb.__eclipseDb;
}

async function transaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getEclipseDb().connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

export async function reserveEclipse(color: EclipseColor, size: EclipseSize, expiresAt: Date): Promise<string | null> {
  return transaction(async db => {
    const stock = await db.query(
      "UPDATE eclipse_inventory SET reserved = reserved + 1 WHERE color = $1 AND reserved < capacity RETURNING color",
      [color]
    );
    if (!stock.rowCount) return null;
    const order = await db.query(
      "INSERT INTO eclipse_orders (color, size, status, checkout_expires_at) VALUES ($1, $2, 'reserved', $3) RETURNING id",
      [color,size,expiresAt.toISOString()]
    );
    return order.rows[0].id as string;
  });
}

export async function attachCheckoutSession(orderId: string, sessionId: string): Promise<void> {
  const result=await getEclipseDb().query(
    "UPDATE eclipse_orders SET stripe_session_id=$2, updated_at=NOW() WHERE id=$1 AND status='reserved'",
    [orderId,sessionId]
  );
  if (!result.rowCount) throw new Error("Unable to associate Stripe session with reserved order");
}

export async function releaseEclipseReservation(orderId: string, status: "failed" | "expired"): Promise<void> {
  await transaction(async db => {
    const update=await db.query(
      "UPDATE eclipse_orders SET status=$2, updated_at=NOW() WHERE id=$1 AND status='reserved' RETURNING color",
      [orderId,status]
    );
    if(update.rowCount){
      await db.query(
        "UPDATE eclipse_inventory SET reserved=reserved-1 WHERE color=$1 AND reserved>0",
        [update.rows[0].color]
      );
    }
  });
}

export async function applyStripeSession(session: {
  id:string;
  client_reference_id?:string|null;
  payment_status?:string|null;
  payment_intent?:string | {id:string}|null;
  customer_details?:{email?:string|null;name?:string|null;phone?:string|null;address?:unknown}|null;
  shipping_details?:{name?:string|null;address?:unknown}|null;
  collected_information?:{shipping_details?:{name?:string|null;address?:unknown}|null}|null;
}, action: "complete" | "async_paid" | "async_failed" | "expired"): Promise<"updated" | "ignored" | "missing"> {
  return transaction(async db => {
    // Select lock makes repeated and out-of-order Stripe notifications idempotent.
    const found=await db.query(
      "SELECT id, color, status FROM eclipse_orders WHERE stripe_session_id=$1 FOR UPDATE",
      [session.id]
    );
    if(!found.rowCount) return "missing";
    const order=found.rows[0] as {id:string;color:EclipseColor;status:OrderStatus};
    if(order.status === "paid" || order.status === "expired" || order.status === "failed") return "ignored";
    if(action === "complete" && session.payment_status !== "paid"){
      await db.query("UPDATE eclipse_orders SET status='processing', updated_at=NOW() WHERE id=$1",[order.id]);
      return "updated";
    }
    if(action === "complete" || action === "async_paid"){
      await db.query(
        `UPDATE eclipse_orders SET status='paid',stripe_payment_intent=$2,
        customer_email=$3,customer_name=$4,shipping_address=$5::jsonb,
        updated_at=NOW() WHERE id=$1`,
        [order.id,typeof session.payment_intent==="string"?session.payment_intent:session.payment_intent?.id||null,
        session.customer_details?.email||null,session.collected_information?.shipping_details?.name||session.shipping_details?.name||session.customer_details?.name||null,
        JSON.stringify(session.collected_information?.shipping_details?.address||session.shipping_details?.address||session.customer_details?.address||null)]
      );
      return "updated";
    }
    await db.query("UPDATE eclipse_orders SET status=$2,updated_at=NOW() WHERE id=$1",[order.id,action==="expired"?"expired":"failed"]);
    await db.query("UPDATE eclipse_inventory SET reserved=reserved-1 WHERE color=$1 AND reserved>0",[order.color]);
    return "updated";
  });
}
