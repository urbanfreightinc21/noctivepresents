import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendEclipseConfirmation } from "../../../lib/eclipse-confirmation";
import { applyStripeSession } from "../../../lib/eclipse-db";

export const runtime = "nodejs";

export async function POST(request: NextRequest){
  const key = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if(!key || !webhookSecret) return NextResponse.json({error:"Webhook not configured"},{status:503});
  const signature = request.headers.get("stripe-signature");
  if(!signature) return NextResponse.json({error:"Missing signature"},{status:400});
  let event: Stripe.Event;
  try {
    const stripe = new Stripe(key);
    // Stripe signatures must be verified against the unchanged raw request body.
    event = stripe.webhooks.constructEvent(await request.text(),signature,webhookSecret);
  } catch {
    return NextResponse.json({error:"Invalid Stripe signature"},{status:400});
  }
  const relevant = new Set([
    "checkout.session.completed",
    "checkout.session.async_payment_succeeded",
    "checkout.session.async_payment_failed",
    "checkout.session.expired",
  ]);
  if(!relevant.has(event.type)) return NextResponse.json({received:true});
  const session=event.data.object as Stripe.Checkout.Session;
  const action=event.type==="checkout.session.completed"?"complete":
    event.type==="checkout.session.async_payment_succeeded"?"async_paid":
    event.type==="checkout.session.async_payment_failed"?"async_failed":"expired";
  try {
    const status=await applyStripeSession(session,action);
    // Retry when a Stripe event races with the database session-association write.
    if(status==="missing") return NextResponse.json({error:"Order not ready for webhook"},{status:503});
    if(action==="complete"||action==="async_paid") await sendEclipseConfirmation(session);
    return NextResponse.json({received:true,status});
  } catch {
    // Stripe will retry failed deliveries.
    return NextResponse.json({error:"Unable to record payment event"},{status:503});
  }
}
