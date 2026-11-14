import Link from "next/link";
import Image from "next/image";
import Waitlist from "./Waitlist";

const products = [
  { color: "black", name: "Black", image: "/wear/ezlipse-black-front.webp.png", back: "/wear/ezlipse-black-back.webp.png" },
  { color: "espresso", name: "Espresso", image: "/wear/ezlipse-espresso-front.webp.png", back: "/wear/ezlipse-espresso-back.webp.png" },
] as const;

export default function EclipseWear() {
  const preordersOpen = false; // Public storefront teaser only; payments deliberately locked.
  return (
    <>
      <section className="ec-hero section" aria-labelledby="ec-title">
        <div className="ec-hero-index"><span>NOCTIVE® / WEAR</span><span>AD—001 / 2026</span></div>
        <div className="ec-hero-main"><div className="ec-hero-copy"><p className="ec-overline">AFTER DARK / DROP 001</p><h1 id="ec-title">ECLIPSE<span>.</span></h1><p className="ec-hero-lead">THE ECLIPSE ZIP-UP HOODIE.</p><Link href="#ec-collection" className="ec-hero-link">EXPLORE THE DROP <span aria-hidden="true">↗</span></Link></div><div className="ec-orbit-art" aria-hidden="true"><div className="ec-orbit-ring"/><div className="ec-orbit-core"/><span>001 / AFTER DARK</span></div></div>
        <div className="ec-hero-foot"><span>BLACK / ESPRESSO</span><span>HEAVYWEIGHT / OVERSIZED</span><span>{preordersOpen ? "PRE-ORDERS NOW OPEN" : "PRE-ORDERS OPENING SOON"}</span></div>
      </section>
      <section className="ec-shop section" aria-labelledby="ec-collection">
        <div className="section-index">01 / THE COLLECTION</div>
        <div className="ec-section-head"><h2 id="ec-collection">THE UNIFORM<span className="ec-punct">.</span></h2><span>01 — ECLIPSE ZIP-UP HOODIE<br/>TWO COLORWAYS / ONE DROP</span></div>
        <div className="ec-shop-grid">
          {products.map((item, i) => (
            <Link className="ec-product-card" href={`/wear/eclipse/${item.color}`} key={item.color}>
              <div className="ec-product-media">
                <Image src={item.image} alt={`Eclipse Zip-Up Hoodie in ${item.name}, front view`} fill sizes="(max-width: 760px) 100vw, 50vw" priority={i === 0} />
                <span className="ec-media-index">NOCTIVE / 00{String(i + 1)}</span><span className="ec-media-color">{item.name.toUpperCase()}</span>
                <span className="ec-media-action">EXPLORE <span aria-hidden="true">↗</span></span>
              </div>
              <div className="ec-card-details"><div><span>AFTER DARK / DROP 001</span><strong>ECLIPSE ZIP-UP</strong><span>{item.name.toUpperCase()} / OVERSIZED FIT</span></div><div className="ec-card-side"><strong>$85</strong><span>VIEW DETAILS ↗</span></div></div>
            </Link>
          ))}
        </div>
        <div className="ec-description">
          <div><span className="ec-tiny-label">DESIGN / 001</span><h3>AFTER<br /><em>DARK.</em></h3></div>
          <div className="ec-description-copy"><p>400g fleece. Oversized construction. Satin-lined hood. Signature Eclipse artwork and contour detailing.</p><div className="ec-description-tokens"><span>400G FLEECE</span><span>OVERSIZED</span><span>BLACK / ESPRESSO</span></div></div>
        </div>
      </section>
      <section className="ec-access section" id="access">
        <div className="section-index">02 / DROP ACCESS</div>
        <div className="ec-access-grid">
          <div><p className="ec-overline">NOCTIVE / DROP 001</p><h2>STAY<br />CLOSE.</h2><p>{preordersOpen ? "Eclipse Drop 001 pre-orders are available now. Get the latest updates and next releases." : "Get drop updates and release information directly to your inbox."}</p></div>
          <div className="ec-access-panel"><Waitlist /></div>
        </div>
      </section>
    </>
  );
}
