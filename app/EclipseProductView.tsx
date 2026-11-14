"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SIZES = ["S", "M", "L", "XL", "2XL"] as const;
type Color = "black" | "espresso";

const products: Record<Color,{label:string; images:string[]}> = {
  black: {label:"Black", images:["/wear/eclipse-black-front.webp", "/wear/eclipse-black-back.webp"]},
  espresso: {label:"Espresso", images:["/wear/eclipse-espresso-front.webp", "/wear/eclipse-espresso-back.webp"]},
};

export default function EclipseProductView({color,preorderOpen,price,estimatedShip}: {color:Color;preorderOpen:boolean;price:number|null;estimatedShip:string|null}) {
  const product=products[color];
  const [size,setSize]=useState<string>("M");
  const [selected,setSelected]=useState(0);
  const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState("");
  async function checkout() {
    if (!preorderOpen || submitting) return;
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
          <div className="ec-options"><strong>SIZE</strong><div className="ec-sizes">{SIZES.map(v=><button key={v} type="button" className={v===size?"is-selected":""} onClick={()=>setSize(v)} aria-pressed={v===size}>{v}</button>)}</div><p className="ec-size-note">Sizing and stock quantities will be confirmed before pre-orders open.</p></div>
          <button type="button" className="ec-preorder-btn" onClick={checkout} disabled={!preorderOpen||submitting}>{preorderOpen?(submitting?"OPENING SECURE CHECKOUT...":"PRE-ORDER"):"PRE-ORDERS OPENING SOON"}</button>
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
