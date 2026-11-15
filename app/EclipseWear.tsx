"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Waitlist from "./Waitlist";

const variants = {
  black: {
    label: "BLACK",
    index: "01",
    back: "/wear/ezlipse-black-back.webp.png",
    title: "Black Eclipse Zip-Up Hoodie, back graphic",
    colorClass: "black",
  },
  espresso: {
    label: "ESPRESSO",
    index: "02",
    back: "/wear/ezlipse-espresso-back.webp.png",
    title: "Espresso Eclipse Zip-Up Hoodie, back graphic",
    colorClass: "espresso",
  },
} as const;

type Colorway = keyof typeof variants;

export default function EclipseWear() {
  const [color, setColor] = useState<Colorway>("black");
  const active = variants[color];

  return (
    <div className="nvwear">
      <section className="nvwear-stage" aria-labelledby="nvwear-title">
        <div className="nvwear-meta"><span>NOCTIVE / WEAR</span><span>AFTER DARK COLLECTION</span><span>RELEASE 001</span></div>
        <div className="nvwear-stage-grid">
          <div className="nvwear-display">
            <div className="nvwear-display-index"><span>OBJECT 001</span><span>REAR VIEW</span></div>
            <div className="nvwear-ring" aria-hidden="true"/>
            <div className="nvwear-ghost" aria-hidden="true">01</div>
            <div className="nvwear-garment" key={color}>
              <Image src={active.back} alt={active.title} fill priority sizes="(max-width: 800px) 100vw, 64vw" />
            </div>
            <div className="nvwear-display-bottom"><span>400 GSM / HEAVYWEIGHT</span><span>ARTWORK / DROP 001</span></div>
          </div>
          <div className="nvwear-content">
            <div className="nvwear-heading-label"><span className="nvwear-line"/>THE FIRST DROP</div>
            <h1 id="nvwear-title">ECLIPSE<span>.</span></h1>
            <p className="nvwear-subtitle">ZIP-UP HOODIE / AFTER DARK 001</p>
            <p className="nvwear-intro">An oversized zip-up built around the Eclipse back graphic. Heavyweight fleece, satin-lined hood, signature contour work.</p>
            <div className="nvwear-switch" role="group" aria-label="Choose colorway">
              <span className="nvwear-switch-label">SELECT COLORWAY <span>{active.index} / 02</span></span>
              <div className="nvwear-switch-items">
                <button type="button" onClick={() => setColor("black")} className={color === "black" ? "nvwear-active" : ""} aria-pressed={color === "black"}><i className="nvwear-dot-black" aria-hidden="true" />BLACK</button>
                <button type="button" onClick={() => setColor("espresso")} className={color === "espresso" ? "nvwear-active" : ""} aria-pressed={color === "espresso"}><i className="nvwear-dot-espresso" aria-hidden="true" />ESPRESSO</button>
              </div>
            </div>
            <div className="nvwear-buy-row"><strong>$80<span>.00</span></strong><span>PRE-ORDERS OPENING SOON</span></div>
            <Link className="nvwear-link" href={`/wear/eclipse/${color}`}>VIEW {active.label} HOODIE <span>VIEW DETAILS</span></Link>
            <p className="nvwear-smallprint">Standard U.S. shipping or free local handoff by arrangement when ordering opens.</p>
          </div>
        </div>
      </section>
      <section className="nvwear-lower section" id="access" aria-label="Release updates">
        <div className="nvwear-lower-id">RELEASE / 001</div>
        <div className="nvwear-lower-grid">
          <div><span className="nvwear-lower-kicker">NOCTIVE AFTER DARK</span><h2>FIRST<br/>ACCESS.</h2><p>Sign up to be notified when pre-orders open.</p></div>
          <div className="nvwear-signup"><Waitlist /></div>
        </div>
        <div className="nvwear-footerline"><span>NOCTIVE WEAR</span><span>ECLIPSE ZIP-UP</span><span>DROP 001</span></div>
      </section>
    </div>
  );
}
