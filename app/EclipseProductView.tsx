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

export default function EclipseProductView({color,preorderOpen,price,estimatedShip,isTestMode}: {color:Color;preorderOpen:boolean;price:number|null;estimatedShip:string|null;isTestMode:boolean}) {
  const product=products[color];
  const [size,setSize]=useState<string>("M");
  const [selected,setSelected]=useState(0);
  const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState("");
  const [sizeUnit,setSizeUnit]=useState<"in"|"cm">("in");
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
      <header className="ec-header"><Link href="/" className="ec-mark">NOCTIVE</Link><span className="ec-header-edition">AFTER DARK / 001</span><nav><Link href="/wear">WEAR</Link><Link href="/events">EVENTS</Link><Link href="/about">ABOUT</Link></nav></header>
      <div className="ec-breadcrumb"><Link href="/wear">WEAR</Link><span>/</span><span>DROP 001</span><span>/</span><span>{product.label.toUpperCase()}</span></div>
      {orderStatus&&<section role="status" aria-live="polite" style={{maxWidth:900,margin:"24px auto",padding:"20px 24px",border:"1px solid #666",borderRadius:8}}>
        <strong>{orderStatus==="paid"?(isTestMode?"TEST PAYMENT CONFIRMED":"PAYMENT CONFIRMED"):orderStatus==="checking"?(isTestMode?"VERIFYING TEST PAYMENT":"VERIFYING PAYMENT"):orderStatus==="cancelled"?"CHECKOUT CANCELLED":orderStatus==="expired"?"CHECKOUT EXPIRED":orderStatus==="processing"?"PAYMENT STILL PROCESSING":"PAYMENT STATUS NOT VERIFIED"}</strong>
        <p style={{marginTop:8}}>{orderStatus==="paid"?(isTestMode?"Stripe reports that your sandbox payment succeeded. No real money was charged.":"Stripe confirms your payment. Your pre-order has been received; keep your Stripe receipt for your records."):orderStatus==="checking"?(isTestMode?"Checking your Stripe sandbox transaction.":"Checking your payment status."):orderStatus==="cancelled"?"The checkout was cancelled. No new payment was confirmed.":orderStatus==="expired"?"The checkout session expired without a confirmed payment.":orderStatus==="processing"?"Stripe has not confirmed the payment yet. Please check the Stripe sandbox before retrying.":"We could not verify the payment. Check Stripe sandbox payments before attempting another order."}</p>
      </section>}
      <section className="ec-detail" aria-labelledby="ec-product-name">
        <div className="ec-gallery"><div className="ec-gallery-topline"><span>AD—001 / {product.label.toUpperCase()}</span><span>FRONT / BACK</span></div>
          <div className="ec-detail-image"><span className="ec-image-corner">ECLIPSE / 001</span><Image src={product.images[selected]} alt={`Eclipse Zip-Up Hoodie ${product.label}, ${selected===0?"front":"back"} view`} fill sizes="(max-width: 900px) 100vw, 60vw" priority /></div>
          <div className="ec-thumbs">
            {product.images.map((src,i)=><button key={src} type="button" className={selected===i?"is-active":""} onClick={()=>setSelected(i)} aria-label={i===0?"Show front":"Show back"} aria-pressed={selected===i}><Image src={src} alt={i===0?"Front view":"Back view"} fill sizes="100px" /></button>)}
          </div>
        </div>
        <div className="ec-product-details">
          <p className="ec-overline">AFTER DARK — 001 <span className="ec-detail-dot">●</span> {product.label.toUpperCase()}</p>
          <h1 id="ec-product-name">ECLIPSE<br/><span>ZIP-UP HOODIE</span></h1>
          <p className="ec-product-sub">DROP 001 / HEAVYWEIGHT OVERSIZED FLEECE</p>
          <div className="ec-product-price"><span>{price===null?"PRICE TO BE ANNOUNCED":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(price/100)}</span><small>USD / PRE-ORDER</small></div>
          <div className="ec-options"><strong>COLOR</strong><div className="ec-color-choices"><Link href="/wear/eclipse/black" aria-current={color==="black"?"page":undefined} className={color==="black"?"is-selected":""}><span className="ec-swatch ec-swatch-black"/>BLACK</Link><Link href="/wear/eclipse/espresso" aria-current={color==="espresso"?"page":undefined} className={color==="espresso"?"is-selected":""}><span className="ec-swatch ec-swatch-espresso"/>ESPRESSO</Link></div></div>
          <div className="ec-options"><strong>SIZE</strong><div className="ec-sizes">{SIZES.map(v=><button key={v} type="button" className={v===size?"is-selected":""} onClick={()=>setSize(v)} aria-pressed={v===size}>{v}</button>)}</div><p className="ec-size-note">Oversized fit / measurements below. Select your usual size for a relaxed silhouette.</p><a className="ec-measure-link" href="#ec-size-guide">VIEW SIZE GUIDE ↓</a></div>
          {preorderOpen&&stock&&stock[color]<=0&&<p className="ec-size-note" aria-live="polite">SOLD OUT</p>}
          <button type="button" className="ec-preorder-btn" onClick={checkout}
            disabled={!preorderOpen||submitting||!stock||stock[color] <= 0}>
            {!preorderOpen?"PRE-ORDERS OPENING SOON":!stock?"CHECKING AVAILABILITY":stock[color]<=0?"SOLD OUT":submitting?"OPENING SECURE CHECKOUT...":"PRE-ORDER"}
          </button>
          {error&&<p role="alert" className="ec-checkout-error">{error}</p>}
          {preorderOpen&&<p className="ec-order-note">PRE-ORDER / ESTIMATED DISPATCH 4–6 WEEKS AFTER PURCHASE. SHIPPING CALCULATED AT CHECKOUT.</p>}
          <div className="ec-editorial-intro">
            <span className="ec-detail-kicker">DROP 001 / AFTER DARK</span>
            <p>Heavyweight fleece. Oversized construction. A double-layer hood and eclipse artwork, finished with contrast contour lines.</p>
            <div className="ec-spec-stat"><span>400G FLEECE</span><span>65.55% COTTON / 34.45% POLYESTER</span></div>
          </div>
          <div className="ec-info-accordion">
            <details open>
              <summary>01 / SPECIFICATIONS <span aria-hidden="true">+</span></summary>
              <ul className="ec-spec-list">
                <li>400g fleece, per manufacturer specification</li>
                <li>65.55% cotton / 34.45% polyester</li>
                <li>Oversized fit with ribbed cuffs and hem</li>
                <li>Double-layer hood with imitation-silk lining</li>
                <li>Exposed silver-teeth zipper with black tape</li>
                <li>Embroidered chest emblem and kangaroo pocket</li>
                <li>Direct-printed eclipse graphic and contour detailing</li>
              </ul>
            </details>
            <details id="ec-size-guide">
              <summary>02 / SIZE GUIDE <span aria-hidden="true">+</span></summary>
              <p className="ec-info-description">Garment measurements. Compare against a hoodie you own, laid flat. Chest is measured across the garment, not around the body.</p>
              <div className="ec-size-head"><span>OVERSIZED / S—XL</span><div className="ec-unit-toggle" role="group" aria-label="Measurement unit"><button type="button" onClick={()=>setSizeUnit("in")} aria-pressed={sizeUnit==="in"} className={sizeUnit==="in"?"active":""}>IN</button><button type="button" onClick={()=>setSizeUnit("cm")} aria-pressed={sizeUnit==="cm"} className={sizeUnit==="cm"?"active":""}>CM</button></div></div>
              <div className="ec-table-scroll"><table className="ec-size-table">
                <thead><tr><th scope="col">MEASUREMENT</th>{SIZES.map(v=><th scope="col" key={v}>{v}</th>)}</tr></thead>
                <tbody>{([
                  ["Length",[28,29,30,30.5]],
                  ["Chest (flat)",[25,27,29,30]],
                  ["Shoulder",[23,24.8,26.5,28.3]],
                  ["Sleeve",[24.5,25,25.5,26]]
                ] as const).map(([label,values])=><tr key={label}><th scope="row">{label}</th>{values.map((v,i)=><td key={i}>{sizeUnit==="in"?v:(Math.round(v*2.54*10)/10).toFixed(1)}</td>)}</tr>)}</tbody>
              </table></div>
              <p className="ec-size-disclaimer">Manufacturer measurements; minor production tolerances may apply. All measurements are {sizeUnit==="in"?"in inches":"in centimeters"}.</p>
            </details>
            <details>
              <summary>03 / PRE-ORDER & SHIPPING <span aria-hidden="true">+</span></summary>
              <p className="ec-info-description">This is a pre-order. Estimated dispatch is <strong>4–6 weeks from order placement</strong>, not delivery. Your payment is collected at checkout. Tracking will be emailed after your order ships.</p>
              <p className="ec-info-description">Standard US shipping: $12.95, shown at checkout. Estimated dispatch times may change if manufacturing or customs is delayed. We will contact affected customers with updated options, including cancellation and refund where required.</p>
            </details>
            <details>
              <summary>04 / FAQ <span aria-hidden="true">+</span></summary>
              <div className="ec-faq">
                <h3>WHEN WILL MY ORDER SHIP?</h3><p>We currently estimate dispatch within 4–6 weeks after your order is placed. This is an estimate, not a guaranteed delivery date.</p>
                <h3>WHAT SIZE SHOULD I GET?</h3><p>The silhouette is designed to be oversized. Check the garment size chart above against a hoodie you already own before choosing a size.</p>
                <h3>WILL I RECEIVE TRACKING?</h3><p>Yes. Tracking will be sent to the email provided at checkout once the package is shipped.</p>
                <h3>CAN I CANCEL IF MY ORDER IS DELAYED?</h3><p>If we cannot meet the communicated shipping timeframe, we'll notify you and provide the required cancellation and refund options.</p>
                <h3>ARE THE IMAGES FINAL PRODUCTION PHOTOS?</h3><p>No. Images are digital mockups. Final manufactured color and minor construction details may vary.</p>
              </div>
            </details>
          </div>
          <Link href="/wear" className="ec-back-link">BACK TO WEAR ↗</Link>
        </div>
      </section>
      <footer className="ec-footer"><span>NOCTIVE / WEAR</span><span>AFTER DARK / DROP 001</span></footer>
    </main>
  );
}
