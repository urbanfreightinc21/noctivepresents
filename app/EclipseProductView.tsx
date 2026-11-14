"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SIZES = ["S", "M", "L", "XL"] as const;
type Color = "black" | "espresso";

const products: Record<Color,{label:string; images:string[]}> = {
  black: {label:"Black", images:["/wear/ezlipse-black-front.webp.png", "/wear/ezlipse-black-back.webp.png"]},
  espresso: {label:"Espresso", images:["/wear/ezlipse-espresso-front.webp.png", "/wear/ezlipse-espresso-back.webp.png"]},
};

export default function EclipseProductView({color,preorderOpen,price,estimatedShip}: {color:Color;preorderOpen:boolean;price:number|null;estimatedShip:string|null}) {
  const product=products[color];
  const [size,setSize]=useState<string>("M");
  const [selected,setSelected]=useState(0);
  const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState("");
  const [stock,setStock]=useState<{black:number;espresso:number}|null>(null);
  const [orderStatus,setOrderStatus]=useState<"checking"|"paid"|"processing"|"expired"|"cancelled"|"unverified"|null>(null);
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const result=params.get("order");
    if(result==="cancelled"){setOrderStatus("cancelled");return;}
    if(result!=="success")return;
    const sessionId=params.get("session_id");
    if(!sessionId){setOrderStatus("unverified");return;}
    let active=true;
    setOrderStatus("checking");
    fetch(`/api/eclipse-order-status?session_id=${encodeURIComponent(sessionId)}`,{cache:"no-store"})
      .then(async r=>{if(!r.ok)throw new Error("Unable to verify order");return r.json();})
      .then(data=>{if(active)setOrderStatus(data.paymentConfirmed?"paid":data.status==="expired"?"expired":"processing");})
      .catch(()=>{if(active)setOrderStatus("unverified");});
    return ()=>{active=false;};
  },[]);
  useEffect(()=>{
    if(!preorderOpen)return;
    let active=true;
    fetch("/api/eclipse-stock",{cache:"no-store"})
      .then(async r=>{if(!r.ok)throw new Error("Stock unavailable");return r.json();})
      .then(data=>{if(active&&data.available&&data.remaining)setStock(data.remaining);})
      .catch(()=>{if(active)setStock(null);});
    return ()=>{active=false;};
  },[preorderOpen]);
  async function checkout() {
    if (!preorderOpen || submitting || !stock || stock[color] <= 0) return;
    setSubmitting(true);setError("");
    try {
      const res=await fetch("/api/eclipse-checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({color,size})});
      const data=await res.json();
      if(!res.ok||!data.url||!data.url.startsWith("https://checkout.stripe.com/")) throw new Error(data.error||"Checkout is temporarily unavailable.");
      window.location.assign(data.url);
    } catch(e) {setError(e instanceof Error?e.message:"Checkout is temporarily unavailable.");setSubmitting(false);}
  }
  return (
    <main className="ec-page">
      <header className="ec-header"><Link href="/" className="ec-mark">NOCTIVE</Link><nav><Link href="/wear">WEAR</Link><Link href="/events">EVENTS</Link><Link href="/about">ABOUT</Link></nav></header>
      <div className="ec-breadcrumb"><Link href="/wear">WEAR</Link><span>/</span><span>DROP 001</span><span>/</span><span>{product.label.toUpperCase()}</span></div>
      {orderStatus&&<section role="status" aria-live="polite" style={{maxWidth:900,margin:"24px auto",padding:"20px 24px",border:"1px solid #666",borderRadius:8}}>
        <strong>{orderStatus==="paid"?"TEST PAYMENT CONFIRMED":orderStatus==="checking"?"VERIFYING TEST PAYMENT":orderStatus==="cancelled"?"CHECKOUT CANCELLED":orderStatus==="expired"?"CHECKOUT EXPIRED":orderStatus==="processing"?"PAYMENT STILL PROCESSING":"PAYMENT STATUS NOT VERIFIED"}</strong>
        <p style={{marginTop:8}}>{orderStatus==="paid"?"Stripe reports that your sandbox payment succeeded. No real money was charged.":orderStatus==="checking"?"Checking your Stripe sandbox transaction.":orderStatus==="cancelled"?"The checkout was cancelled. No new payment was confirmed.":orderStatus==="expired"?"The checkout session expired without a confirmed payment.":orderStatus==="processing"?"Stripe has not confirmed the payment yet. Please check the Stripe sandbox before retrying.":"We could not verify the payment. Check Stripe sandbox payments before attempting another order."}</p>
      </section>}
      <section className="ec-detail" aria-labelledby="ec-product-name">
        <div className="ec-gallery">
          <div className="ec-detail-image"><Image src={product.images[selected]} alt={`Eclipse Zip-Up Hoodie ${product.label}, ${selected===0?"front":"back"} view`} fill sizes="(max-width: 900px) 100vw, 60vw" priority /></div>
          <div className="ec-thumbs">
            {product.images.map((src,i)=><button key={src} type="button" className={selected===i?"is-active":""} onClick={()=>setSelected(i)} aria-label={i===0?"Show front":"Show back"} aria-pressed={selected===i}><Image src={src} alt={i===0?"Front view":"Back view"} fill sizes="100px" /></button>)}
          </div>
        </div>
        <div className="ec-product-details">
          <p className="ec-overline">NOCTIVE / AFTER DARK / DROP 001</p>
          <h1 id="ec-product-name">ECLIPSE<br/>ZIP-UP HOODIE</h1>
          <p className="ec-product-sub">{product.label.toUpperCase()} / LIMITED FIRST RELEASE</p>
          <div className="ec-product-price">{price===null?"PRICE TO BE ANNOUNCED":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(price/100)}</div>
          <div className="ec-options"><strong>COLOR</strong><div className="ec-color-choices"><Link href="/wear/eclipse/black" aria-current={color==="black"?"page":undefined} className={color==="black"?"is-selected":""}><span className="ec-swatch ec-swatch-black"/>BLACK</Link><Link href="/wear/eclipse/espresso" aria-current={color==="espresso"?"page":undefined} className={color==="espresso"?"is-selected":""}><span className="ec-swatch ec-swatch-espresso"/>ESPRESSO</Link></div></div>
          <div className="ec-options"><strong>SIZE</strong><div className="ec-sizes">{SIZES.map(v=><button key={v} type="button" className={v===size?"is-selected":""} onClick={()=>setSize(v)} aria-pressed={v===size}>{v}</button>)}</div><p className="ec-size-note">Sizes S–XL. Please check the size chart before placing a pre-order.</p></div>
          {preorderOpen&&stock&&<p className="ec-size-note" aria-live="polite">{stock[color] > 0 ? `${stock[color]} AVAILABLE IN ${product.label.toUpperCase()}` : "SOLD OUT"}</p>}
          <button type="button" className="ec-preorder-btn" onClick={checkout}
            disabled={!preorderOpen||submitting||!stock||stock[color] <= 0}>
            {!preorderOpen?"PRE-ORDERS OPENING SOON":!stock?"CHECKING AVAILABILITY":stock[color]<=0?"SOLD OUT":submitting?"OPENING SECURE CHECKOUT...":"PRE-ORDER"}
          </button>
          {error&&<p role="alert" className="ec-checkout-error">{error}</p>}
          {preorderOpen&&<p className="ec-order-note">This is a pre-order. Estimated shipping: {estimatedShip}. Shipping charges appear in secure checkout before payment.</p>}
          <div className="ec-specs"><h2>PRODUCT DETAILS</h2><p>Oversized, full-zip silhouette with a satin-lined hood, custom NOCTIVE zipper pull, printed white contour detailing, kangaroo pockets, and Eclipse artwork on the back.</p><p>Product images are digital reconstructions. Final color and garment details may vary slightly from the manufactured item.</p></div>
          <Link href="/wear" className="ec-back-link">BACK TO WEAR ↗</Link>
        </div>
      </section>
      <footer className="ec-footer"><span>NOCTIVE / WEAR</span><span>AFTER DARK / DROP 001</span></footer>
    </main>
  );
}
