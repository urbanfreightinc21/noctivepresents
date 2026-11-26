import type Stripe from "stripe";
import {getEclipseDb} from "./eclipse-db";

const escape=(value:string)=>value.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]||c));
export async function sendEclipseConfirmation(session:Stripe.Checkout.Session){
  const key=process.env.RESEND_API_KEY,from=process.env.NOCTIVE_ORDER_FROM;
  if(!key||!from||!session.livemode||session.payment_status!=="paid")return;
  // Persist delivery success; serialize concurrent webhook attempts for this order.
  const db=await getEclipseDb().connect();
  try{
    await db.query("BEGIN");
    const result=await db.query("SELECT id,color,size,delivery_method,customer_email,confirmation_sent_at FROM eclipse_orders WHERE stripe_session_id=$1 AND status='paid' FOR UPDATE",[session.id]);
    const order=result.rows[0];
    if(!order||order.confirmation_sent_at||!order.customer_email){await db.query("COMMIT");return;}
    const color=order.color==="black"?"Black":"Mocha";
    const handoff=order.delivery_method==="handoff";
    const method=handoff?"Free local handoff":"Standard shipping";
    const next=handoff?"We will contact you to arrange local handoff when your order is ready.":"Estimated dispatch: 4–6 weeks after purchase. Tracking will be emailed when your order ships.";
    const total=new Intl.NumberFormat("en-US",{style:"currency",currency:session.currency||"usd"}).format((session.amount_total??0)/100);
    const reference=String(order.id);
    const summary="Eclipse Zip-Up Hoodie — "+color+" / "+order.size+" / Qty 1";
    const html='<div style="background:#101010;color:#f5f5f5;padding:32px;font-family:Arial,sans-serif"><div style="max-width:560px;margin:auto"><p style="font-size:24px;letter-spacing:6px">NOCTIVE</p><p style="color:#aaa;letter-spacing:2px">AFTER DARK / DROP 001</p><h1>YOU’RE IN.</h1><p>Your pre-order is confirmed. Thank you for being part of our first release.</p><hr><p><strong>'+escape(summary)+'</strong></p><p>Order reference: '+escape(reference)+'</p><p>Fulfillment: '+method+'</p><p>Total paid: '+escape(total)+'</p><hr><h2>What happens next</h2><p>'+next+'</p><p><a style="color:#ddd" href="https://noctivepresents.com/contact">Contact Noctive</a></p></div></div>';
    const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json","Idempotency-Key":"eclipse-confirmation-"+reference},body:JSON.stringify({from,to:[order.customer_email],subject:"NOCTIVE / Your pre-order is confirmed",html,text:"Your Noctive pre-order is confirmed.\n"+summary+"\nOrder reference: "+reference+"\nFulfillment: "+method+"\nTotal paid: "+total+"\n"+next}),signal:AbortSignal.timeout(10000)});
    if(!response.ok)throw new Error("Confirmation email provider rejected request");
    await db.query("UPDATE eclipse_orders SET confirmation_sent_at=NOW() WHERE id=$1",[reference]);
    await db.query("COMMIT");
  }catch(error){await db.query("ROLLBACK");throw error;}finally{db.release();}
}
