import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Stripe from "stripe";
import { getEclipseDb } from "../../../lib/eclipse-db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata: Metadata = {title:"Order confirmation | NOCTIVE",robots:{index:false,follow:false},referrer:"no-referrer"};

export default async function Confirmation({searchParams}:{searchParams:Promise<{session_id?:string|string[]}>}){
  const {session_id:id}=await searchParams;
  let order:{id:string;color:string;size:string;delivery_method:string;status:string}|undefined;
  let session:Stripe.Checkout.Session|undefined;
  if(typeof id==="string" && /^cs_(test|live)_[a-zA-Z0-9]+$/.test(id) && id.length<300 && process.env.STRIPE_SECRET_KEY){
    try{
      session=await new Stripe(process.env.STRIPE_SECRET_KEY).checkout.sessions.retrieve(id);
      const result=await getEclipseDb().query("SELECT id,color,size,delivery_method,status FROM eclipse_orders WHERE stripe_session_id=$1 LIMIT 1",[id]);
      order=result.rows[0];
    }catch{ order=undefined; }
  }
  const paid=!!order && order.status==="paid" && session?.payment_status==="paid";
  const processing=!!order && !paid && session?.status!=="expired";
  const handoff=order?.delivery_method==="handoff";
  const color=order?.color==="black"?"Black":"Mocha";
  const money=(amount:number|null|undefined)=>amount==null?"—":new Intl.NumberFormat("en-US",{style:"currency",currency:session?.currency||"usd"}).format(amount/100);
  return <main style={{minHeight:"100vh",background:"#101010",color:"#f4f4f4",padding:"64px 22px",fontFamily:"Arial,sans-serif"}}>
    <section style={{maxWidth:620,margin:"auto"}}>
      <Link href="/" style={{fontSize:22,letterSpacing:6,color:"inherit",textDecoration:"none"}}>NOCTIVE</Link>
      <p style={{color:"#aaa",fontSize:12,letterSpacing:3,marginTop:32}}>AFTER DARK / DROP 001</p>
      <h1 style={{fontSize:"clamp(36px,8vw,62px)",lineHeight:1,margin:"20px 0"}}>{paid?(session?.livemode?"YOU’RE IN.":"TEST ORDER CONFIRMED."):processing?"PAYMENT PROCESSING.":"ORDER NOT VERIFIED."}</h1>
      <p style={{lineHeight:1.6,color:"#ccc"}}>{paid?(session?.livemode?"Your pre-order is confirmed. Thank you for being part of our first release.":"Sandbox payment only. No real money was charged."):processing?"Your payment or order record is still being finalized. Refresh this page to check again.":"We could not confirm this order. Please contact us before attempting another payment."}</p>
      {paid&&order&&<><div style={{display:"flex",alignItems:"center",gap:20,borderTop:"1px solid #444",borderBottom:"1px solid #444",padding:"24px 0",margin:"28px 0"}}>
      <Image src={order.color==="black"?"/wear/ezlipse-black-front.webp.png":"/wear/ezlipse-espresso-front.webp.png"} alt={color+" Eclipse hoodie"} width={110} height={130} style={{objectFit:"contain"}}/>
      <div><strong>Eclipse Zip-Up Hoodie</strong><p>{color} / {order.size} / Qty 1</p><p>{money(session?.amount_subtotal)}</p></div></div>
      <p>Order reference: <strong style={{overflowWrap:"anywhere"}}>{order.id}</strong></p>
      <p>Fulfillment: <strong>{handoff?"Free local handoff":"Standard shipping"}</strong></p>
      <p>Total paid: <strong>{money(session?.amount_total)}</strong></p>
      <div style={{background:"#202020",padding:20,margin:"26px 0",lineHeight:1.6}}><strong>WHAT HAPPENS NEXT</strong><p>{handoff?"We will contact you to arrange local handoff when your pre-order is ready.":"Estimated dispatch is 4–6 weeks from purchase. Tracking will be sent once your order ships."}</p></div></>}
      <Link href="/wear" style={{display:"inline-block",border:"1px solid #999",padding:"14px 22px",color:"inherit",textDecoration:"none"}}>BACK TO WEAR</Link>
      <p style={{marginTop:28}}><Link href="/contact" style={{color:"#bbb"}}>Questions? Contact Noctive.</Link></p>
    </section></main>;
}
