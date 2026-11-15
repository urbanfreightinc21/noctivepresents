import Link from "next/link";
import Image from "next/image";
import Waitlist from "./Waitlist";

const products = [
  { color: "black", name: "Black", front: "/wear/ezlipse-black-front.webp.png", back: "/wear/ezlipse-black-back.webp.png" },
  { color: "espresso", name: "Espresso", front: "/wear/ezlipse-espresso-front.webp.png", back: "/wear/ezlipse-espresso-back.webp.png" },
] as const;

export default function EclipseWear() {
  return (
    <div className="ec-v2">
      <section className="ec-drop-hero" aria-labelledby="ec-drop-title">
        <div className="ec-drop-topbar"><span>NOCTIVE / WEAR DIVISION</span><span>AFTER DARK / 001</span><span className="ec-drop-top-status"><i aria-hidden="true" /> PRE-ORDERS LOCKED</span></div>
        <div className="ec-drop-frame">
          <div className="ec-drop-type">
            <p className="ec-v2-kicker"><span className="ec-v2-cross">✳</span> THE FIRST RELEASE / AD–001</p>
            <h1 id="ec-drop-title">AFTER<br/><em>DARK.</em></h1>
            <p className="ec-drop-subtitle">ECLIPSE ZIP-UP HOODIE<br/>BLACK / ESPRESSO</p>
            <Link href="#ec-v2-collection" className="ec-v2-action">DISCOVER THE DROP <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="ec-drop-visual">
            <div className="ec-drop-dial" aria-hidden="true"><div /></div>
            <div className="ec-drop-garment ec-drop-garment-black">
              <Image src="/wear/ezlipse-black-back.webp.png" alt="Black Eclipse zip-up hoodie — back showing the After Dark graphic" fill priority sizes="(max-width: 800px) 80vw, 35vw" />
            </div>
            <div className="ec-drop-garment ec-drop-garment-espresso">
              <Image src="/wear/ezlipse-espresso-back.webp.png" alt="Espresso Eclipse zip-up hoodie — back graphic" fill priority sizes="(max-width: 800px) 48vw, 22vw" />
            </div>
            <span className="ec-drop-visual-caption">FIG. 01 / REAR GRAPHIC</span>
            <span className="ec-drop-visual-number" aria-hidden="true">001</span>
          </div>
        </div>
        <div className="ec-drop-bottom"><span>EST. CALIFORNIA / NOCTIVE</span><span>400G HEAVYWEIGHT FLEECE</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <div className="ec-v2-marquee" aria-label="After Dark Drop 001, Eclipse Zip-Up Hoodie">
        <span>AFTER DARK 001</span><b aria-hidden="true">✳</b><span>ECLIPSE ZIP-UP</span><b aria-hidden="true">✳</b><span>NOCTIVE WEAR</span><b aria-hidden="true">✳</b><span>AFTER DARK 001</span>
      </div>

      <section className="ec-v2-release section" id="ec-v2-collection" aria-labelledby="ec-v2-release-title">
        <div className="ec-v2-section-top"><span>01 / THE RELEASE</span><span>001 — ECLIPSE SERIES</span></div>
        <div className="ec-v2-release-head"><h2 id="ec-v2-release-title">THE BACK<br/><em>SPEAKS.</em></h2><p>Drop 001 / The Eclipse Zip-Up Hoodie. Two colorways. One graphic. Built around the details.</p></div>
        <div className="ec-v2-products">
          {products.map((item, i) => (
            <Link className={`ec-v2-product ec-v2-product-${item.color}`} href={`/wear/eclipse/${item.color}`} key={item.color}>
              <div className="ec-v2-product-image">
                <div className="ec-v2-product-grid" aria-hidden="true" />
                <span className="ec-v2-card-index">0{i + 1} / 02 — {item.name.toUpperCase()}</span>
                <Image className="ec-v2-back" src={item.back} alt={`Rear view of the ${item.name} Eclipse Zip-Up Hoodie, featuring After Dark artwork`} fill sizes="(max-width: 760px) 100vw, 49vw" />
                <div className="ec-v2-front-peek" aria-hidden="true"><Image src={item.front} alt="" fill sizes="110px" /></div>
                <span className="ec-v2-card-arrow" aria-hidden="true">↗</span>
                <span className="ec-v2-back-label">BACK VIEW / 001</span>
              </div>
              <div className="ec-v2-product-meta"><div><span>NOCTIVE / AFTER DARK 001</span><h3>ECLIPSE ZIP-UP <i>— {item.name.toUpperCase()}</i></h3></div><div className="ec-v2-product-price"><strong>$80</strong><span>EXPLORE PRODUCT ↗</span></div></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="ec-v2-feature" aria-labelledby="ec-v2-feature-title">
        <div className="ec-v2-feature-rail"><span>02 / ARTWORK STUDY</span><span>AFTER DARK — DROP 001</span></div>
        <div className="ec-v2-feature-layout">
          <div className="ec-v2-feature-image"><Image src="/wear/ezlipse-espresso-back.webp.png" alt="Espresso Eclipse hoodie back artwork close presentation" fill sizes="(max-width: 760px) 100vw, 50vw" /><span>REAR / ESPRESSO</span></div>
          <div className="ec-v2-feature-copy">
            <span className="ec-v2-kicker">THE ARTWORK / AD-001</span>
            <h2>THE<br/>ECLIPSE<span>.</span></h2>
            <p>The back graphic takes focus. A heavyweight, oversized zip-up with contrast contour detailing, satin-lined hood and signature Eclipse artwork.</p>
            <div className="ec-v2-feature-specs"><span>01 — 400G FLEECE</span><span>02 — OVERSIZED FIT</span><span>03 — SATIN-LINED HOOD</span><span>04 — TWO COLORWAYS</span></div>
            <Link href="/wear/eclipse/espresso" className="ec-v2-action ec-v2-feature-action">EXPLORE THE DETAILS <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="ec-v2-access section" id="access" aria-labelledby="ec-v2-access-title">
        <div className="ec-v2-section-top"><span>03 / ACCESS</span><span>RELEASE STATUS / NOT YET OPEN</span></div>
        <div className="ec-v2-access-grid">
          <div><span className="ec-v2-kicker">AFTER DARK / DROP 001</span><h2 id="ec-v2-access-title">NOT<br/><em>YET.</em></h2><p>Pre-orders are not open. Join the list for release updates.</p></div>
          <div className="ec-v2-access-panel"><div className="ec-v2-access-panel-index">NOCTIVE / DROP NOTIFICATIONS <span>001</span></div><Waitlist /></div>
        </div>
      </section>
    </div>
  );
}
