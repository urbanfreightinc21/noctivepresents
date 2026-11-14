import { NextRequest,NextResponse } from "next/server";
export const runtime="nodejs";
const sizes=new Set(["S","M","L","XL","2XL"]);
export async function POST(request:NextRequest){
  if(process.env.ECLIPSE_PREORDERS_OPEN!=="true")return NextResponse.json({error:"Pre-orders are not open yet."},{status:403});
  const secret=process.env.STRIPE_SECRET_KEY;
  const price=Number(process.env.ECLIPSE_PRICE_CENTS);
  const shipping=Number(process.env.ECLIPSE_SHIPPING_CENTS);
  const estimatedShip=process.env.ECLIPSE_ESTIMATED_SHIP_DATE;
  if(!secret||!Number.isInteger(price)||price<1||!Number.isInteger(shipping)||shipping<0||!estimatedShip)
    return NextResponse.json({error:"Pre-order checkout is not configured."},{status:503});
  let payload:{color?:unknown;size?:unknown};
  try {payload=await request.json();}catch{return NextResponse.json({error:"Invalid request."},{status:400});}
  const {color,size}=payload;
  if((color!=="black"&&color!=="espresso")||typeof size!=="string"||!sizes.has(size))
    return NextResponse.json({error:"Choose a valid color and size."},{status:400});
  const origin=process.env.NEXT_PUBLIC_SITE_URL||new URL(request.url).origin;
  const colorName=color==="black"?"Black":"Espresso";
  const form=new URLSearchParams();
  const fields:Record<string,string>={
    mode:"payment",
    "line_items[0][quantity]":"1",
    "line_items[0][price_data][currency]":"usd",
    "line_items[0][price_data][unit_amount]":String(price),
    "line_items[0][price_data][product_data][name]":`Eclipse Zip-Up Hoodie — ${colorName} / ${size} (Pre-order)`,
    "line_items[0][price_data][product_data][description]":`After Dark / Drop 001. Estimated shipping: ${estimatedShip}.`,
    "shipping_address_collection[allowed_countries][0]":"US",
    "shipping_options[0][shipping_rate_data][type]":"fixed_amount",
    "shipping_options[0][shipping_rate_data][fixed_amount][currency]":"usd",
    "shipping_options[0][shipping_rate_data][fixed_amount][amount]":String(shipping),
    "shipping_options[0][shipping_rate_data][display_name]":"Standard shipping",
    "metadata[product]":"eclipse-zip-up-hoodie",
    "metadata[color]":color,
    "metadata[size]":size,
    "metadata[drop]":"after-dark-001",
    "metadata[estimated_ship_date]":estimatedShip,
    "payment_intent_data[metadata][product]":"eclipse-zip-up-hoodie",
    "payment_intent_data[metadata][color]":color,
    "payment_intent_data[metadata][size]":size,
    "success_url":`${origin}/wear/eclipse/${color}?order=success`,
    "cancel_url":`${origin}/wear/eclipse/${color}?order=cancelled`,
    "phone_number_collection[enabled]":"true",
  };
  if(process.env.STRIPE_AUTOMATIC_TAX==="true")fields["automatic_tax[enabled]"]="true";
  Object.entries(fields).forEach(([key,value])=>form.set(key,value));
  try{
    const res=await fetch("https://api.stripe.com/v1/checkout/sessions",{
      method:"POST",
      headers:{Authorization:`Bearer ${secret}`,"Content-Type":"application/x-www-form-urlencoded"},
      body:form.toString(),cache:"no-store"
    });
    const result=await res.json();
    if(!res.ok||typeof result.url!=="string")return NextResponse.json({error:"Unable to create a secure checkout session."},{status:502});
    return NextResponse.json({url:result.url});
  }catch{
    return NextResponse.json({error:"Checkout is temporarily unavailable."},{status:502});
  }
}
