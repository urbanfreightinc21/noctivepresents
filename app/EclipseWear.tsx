import Link from "next/link";
import Image from "next/image";
import Waitlist from "./Waitlist";

const products = [
  { color: "black", name: "Black", image: "/wear/eclipse-black-front.webp", back: "/wear/eclipse-black-back.webp" },
  { color: "espresso", name: "Espresso", image: "/wear/eclipse-espresso-front.webp", back: "/wear/eclipse-espresso-back.webp" },
] as const;

export default function EclipseWear() {
  return (
    <>
      <section className="ec-hero section" aria-labelledby="ec-title">
        <div className="ec-hero-index"><span>NOCTIVE / WEAR</span><span>COLLECTION 001</span></div>
        <p className="ec-overline">AFTER DARK — DROP 001</p>
        <h1 id="ec-title">ECLIPSE<span>.</span></h1>
        <p className="ec-hero-lead">THE ECLIPSE ZIP-UP HOODIE.</p>
        <div className="ec-hero-foot"><span>BLACK / ESPRESSO</span><span>PRE-ORDERS OPENING SOON</span></div>
      </section>
      <section className="ec-shop section" aria-labelledby="ec-collection">
        <div className="section-index">01 / THE COLLECTION</div>
        <div className="ec-section-head"><h2 id="ec-collection">ECLIPSE ZIP-UP HOODIE</h2><span>DROP 001 / TWO COLORWAYS</span></div>
        <div className="ec-shop-grid">
          {products.map((item, i) => (
            <Link className="ec-product-card" href={`/wear/eclipse/${item.color}`} key={item.color}>
              <div className="ec-product-media">
                <Image src={item.image} alt={`Eclipse Zip-Up Hoodie in ${item.name}, front view`} fill sizes="(max-width: 760px) 100vw, 50vw" priority={i === 0} />
                <span className="ec-media-index">001 / {String(i + 1).padStart(2, "0")}</span>
                <span className="ec-media-action">VIEW PRODUCT</span>
              </div>
              <div className="ec-card-details"><div><strong>ECLIPSE ZIP-UP HOODIE</strong><span>{item.name.toUpperCase()}</span></div><span>VIEW DETAILS ↗</span></div>
            </Link>
          ))}
        </div>
        <div className="ec-description">
          <div><span className="ec-tiny-label">THE DETAILS</span><h3>BUILT FOR<br />AFTER DARK.</h3></div>
          <p>Oversized silhouette. Satin-lined hood. Printed contour detailing. Custom NOCTIVE hardware. Finished with the Eclipse back graphic. Two colorways, one first release.</p>
        </div>
      </section>
      <section className="ec-access section" id="access">
        <div className="section-index">02 / DROP ACCESS</div>
        <div className="ec-access-grid">
          <div><p className="ec-overline">DROP 001 / AFTER DARK</p><h2>BE FIRST<br />TO KNOW.</h2><p>Pre-order details and the official release announcement, straight to your inbox.</p></div>
          <div className="ec-access-panel"><Waitlist /></div>
        </div>
      </section>
    </>
  );
}
