import Link from "next/link";
import Image from "next/image";
import Waitlist from "./Waitlist";

export default function EclipseWear() {
  return (
    <div className="ew-min">
      <section className="ew-stage" aria-labelledby="ew-title">
        <div className="ew-stage-top"><span>NOCTIVE® / WEAR</span><span>001 / FIRST RELEASE</span><span>PRE-ORDERS / SOON</span></div>
        <div className="ew-stage-center">
          <div className="ew-headline">
            <span className="ew-overline">ECLIPSE ZIP-UP HOODIE</span>
            <h1 id="ew-title">AFTER<br/><span>DARK</span><b>.</b></h1>
            <p>DROP 001 — BLACK / ESPRESSO</p>
            <a href="#ew-choose" className="ew-stage-cta">EXPLORE THE DROP <span aria-hidden="true">↘</span></a>
          </div>
          <div className="ew-images" aria-label="Back views of the Black and Espresso Eclipse hoodies">
            <div className="ew-image-sphere" aria-hidden="true" />
            <div className="ew-image-item ew-image-black"><Image src="/wear/ezlipse-black-back.webp.png" alt="Black Eclipse hoodie showing the back graphic" fill priority sizes="(max-width: 700px) 68vw, 37vw" /></div>
            <div className="ew-image-item ew-image-brown"><Image src="/wear/ezlipse-espresso-back.webp.png" alt="Espresso Eclipse hoodie showing the back graphic" fill priority sizes="(max-width: 700px) 46vw, 24vw" /></div>
            <span className="ew-image-caption">REAR VIEW / ARTWORK 001</span>
          </div>
        </div>
        <div className="ew-stage-bottom"><span>400G HEAVYWEIGHT FLEECE</span><span>OVERSIZED / SATIN-LINED</span><span>NOCTIVE — 2026</span></div>
      </section>

      <section className="ew-select section" id="ew-choose" aria-labelledby="ew-selection">
        <div className="ew-section-id"><span>01 / SELECT COLORWAY</span><span>PRICE / USD</span></div>
        <div className="ew-select-title"><h2 id="ew-selection">ONE PIECE.<br/><span>TWO VERSIONS.</span></h2><p>The Eclipse Zip-Up. Choose your colorway and explore the details.</p></div>
        <div className="ew-options">
          <Link href="/wear/eclipse/black" className="ew-option"><span className="ew-option-num">01</span><span className="ew-option-swatch ew-option-black" aria-hidden="true"/><strong>BLACK</strong><span className="ew-option-price">$80</span><span className="ew-option-arrow" aria-hidden="true">↗</span></Link>
          <Link href="/wear/eclipse/espresso" className="ew-option"><span className="ew-option-num">02</span><span className="ew-option-swatch ew-option-espresso" aria-hidden="true"/><strong>ESPRESSO</strong><span className="ew-option-price">$80</span><span className="ew-option-arrow" aria-hidden="true">↗</span></Link>
        </div>
        <div className="ew-order-foot"><span>PRE-ORDERS NOT YET OPEN</span><span>STANDARD SHIPPING OR FREE LOCAL HANDOFF WHEN AVAILABLE</span></div>
      </section>

      <section className="ew-register section" id="access" aria-labelledby="ew-register-title">
        <div className="ew-section-id"><span>02 / RELEASE ACCESS</span><span>DROP 001</span></div>
        <div className="ew-register-grid"><div><h2 id="ew-register-title">GET THE<br/>NOTICE<span>.</span></h2><p>Pre-orders are locked. Sign up for the release announcement.</p></div><div className="ew-register-form"><Waitlist /></div></div>
      </section>
    </div>
  );
}
