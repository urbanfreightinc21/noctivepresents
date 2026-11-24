import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getEclipseDb } from "../../../lib/eclipse-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request:NextRequest) {
  const sessionId=request.nextUrl.searchParams.get("session_id");
  if(!sessionId||!/^cs_(test|live)_[a-zA-Z0-9]+$/.test(sessionId)||sessionId.length>300)
    return NextResponse.json({error:"Invalid checkout session"},{status:400});
  if(!process.env.STRIPE_SECRET_KEY || !process.env.DATABASE_URL)
    return NextResponse.json({error:"Order status unavailable"},{status:503});
  try {
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    const session=await stripe.checkout.sessions.retrieve(sessionId);
    const result=await getEclipseDb().query(
      "SELECT status,color,size FROM eclipse_orders WHERE stripe_session_id=$1 LIMIT 1",
      [sessionId]
    );
    if(!result.rowCount)return NextResponse.json({error:"Order not found"},{status:404});
    const order=result.rows[0] as {status:string;color:string;size:string};
    const paymentConfirmed=session.payment_status==="paid";
    const status=paymentConfirmed?"paid":session.status==="expired"?"expired":order.status;
    return NextResponse.json({status,paymentConfirmed,color:order.color,size:order.size,recorded:order.status==="paid"}, {headers:{"Cache-Control":"no-store"}});
  } catch {
    return NextResponse.json({error:"Unable to verify checkout"},{status:503});
  }
}
