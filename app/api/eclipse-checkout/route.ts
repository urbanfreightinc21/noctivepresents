import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { attachCheckoutSession,releaseEclipseReservation,reserveEclipse } from "../../../lib/eclipse-db";

export const runtime = "nodejs";
const sizes = new Set(["S","M","L","XL"]);
const colors = new Set(["black","espresso"]);

export async function POST(request:NextRequest) {
  // Fail closed: no charged orders until ALL checkout systems are configured.
  if(process.env.ECLIPSE_PREORDERS_OPEN!=="true")
    return NextResponse.json({error:"Pre-orders are not open yet."},{status:403});
  const key=process.env.STRIPE_SECRET_KEY;
  const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET;
  const price=Number(process.env.ECLIPSE_PRICE_CENTS||8000);
  const shipping=Number(process.env.ECLIPSE_SHIPPING_CENTS);
  const estimatedShip=process.env.ECLIPSE_ESTIMATED_SHIP_DATE;
  if(!key||!webhookSecret||!process.env.DATABASE_URL||!estimatedShip||
    !Number.isSafeInteger(price)||price<1||
    !Number.isSafeInteger(shipping)||shipping<0)
    return NextResponse.json({error:"Pre-order checkout is not configured."},{status:503});

  let input: {color?:unknown;size?:unknown;deliveryMethod?:unknown};
  try{input=await request.json();}catch{return NextResponse.json({error:"Invalid selection."},{status:400});}
  const {color,size}=input;
  const deliveryMethod=input.deliveryMethod??"shipping";
  if(typeof color!=="string"||typeof size!=="string"||!colors.has(color)||!sizes.has(size)||(deliveryMethod!=="shipping"&&deliveryMethod!=="handoff"))
    return NextResponse.json({error:"Select a valid color and size."},{status:400});

  const expiry=Math.floor(Date.now()/1000)+1860; // Leave time for the reservation before Stripe validates its 30-minute minimum.
  let orderId:string|null=null;
  try{
    orderId=await reserveEclipse(color as "black"|"espresso",size as "S"|"M"|"L"|"XL",deliveryMethod,new Date(expiry*1000));
    if(!orderId)return NextResponse.json({error:"This colorway has sold out."},{status:409});
    const stripe=new Stripe(key);
    const session=await stripe.checkout.sessions.create({
      mode:"payment",
      client_reference_id:orderId,
      expires_at:expiry,
      line_items:[{
        quantity:1,
        price_data:{
          currency:"usd",unit_amount:price,
          product_data:{
            name:`Eclipse Zip-Up Hoodie — ${color==="black"?"Black":"Mocha"} / ${size} (Pre-order)`,
            description:`After Dark / Drop 001. Estimated shipment: ${estimatedShip}.`
          }
        }
      }],
      ...(deliveryMethod==="shipping" ? {
        shipping_address_collection:{allowed_countries:["US" as const]},
        shipping_options:[{shipping_rate_data:{
          type:"fixed_amount" as const,
          fixed_amount:{amount:shipping,currency:"usd"},
          display_name:"Standard shipping"
        }}]
      } : {
        billing_address_collection:"required" as const
      }),
      phone_number_collection:{enabled:true},
      automatic_tax:{enabled:process.env.STRIPE_AUTOMATIC_TAX==="true"},
      metadata:{order_id:orderId,product:"eclipse-zip-up-hoodie",color,size,drop:"001",estimated_ship_date:estimatedShip,delivery_method:deliveryMethod},
      payment_intent_data:{metadata:{order_id:orderId,product:"eclipse-zip-up-hoodie",color,size,delivery_method:deliveryMethod}},
      success_url:`${request.nextUrl.origin}/wear/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:`${request.nextUrl.origin}/wear/eclipse/${color}?order=cancelled`,
    },{idempotencyKey:`eclipse-${orderId}`});
    if(!session.url)throw new Error("Stripe Checkout URL unavailable");
    await attachCheckoutSession(orderId,session.id);
    return NextResponse.json({url:session.url},{headers:{"Cache-Control":"no-store"}});
  }catch{
    // Fail closed if Stripe or database writes fail. If a session exists but association
    // failed, its signed event will remain unprocessed until reconciled; no overselling.
    if(orderId)await releaseEclipseReservation(orderId,"failed").catch(()=>{});
    return NextResponse.json({error:"Unable to reserve a hoodie. Please try again."},{status:503});
  }
}
