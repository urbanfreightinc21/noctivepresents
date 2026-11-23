import Image from "next/image";
import Link from "next/link";
import HomeEvent from "./HomeEvent";
import Waitlist from "./Waitlist";

const INSTAGRAM = "https://www.instagram.com/noctivepresents/";
const divisions = [
  { number:"01", name:"EVENTS", status:"JAN 16 / FRESNO", copy:"Junkie Kid: After Dark 002 at Los Arcos in Fresno on January 16, 2027.", href:"/events", featured:true },
  { number:"02", name:"WEAR", status:"PRE-ORDERS / SOON", copy:"Eclipse Zip-Up pre-orders open soon. Preview the first apparel drop from Noctive.", href:"/wear" },
  { number:"03", name:"ABOUT", status:"NOCTIVE / INDEPENDENT", copy:"Why we make what we make — and the point of view connecting it all.", href:"/about" },
];

export default function Home() {
  return <main>
    <header className="nav"><Link className="nav-brand" href="/" aria-label="Noctive home"><Image src="/noctive-logo.png" alt="" width={34} height={34} priority/><span>NOCTIVE</span></Link><nav aria-label="Primary navigation"><Link href="/wear">Wear</Link><Link href="/events">Events</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><a className="nav-social" href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram ↗</a></header>
    <section className="hero drop-hero" id="top" aria-labelledby="drop-title">
      <div className="noise" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-a" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-b" aria-hidden="true" />
      <div className="drop-hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">AFTER DARK COLLECTION / DROP 001</p>
          <h1 id="drop-title"><span>ECLIPSE</span><strong>ZIP-UP</strong></h1>
          <p className="hero-sub">BLACK / MOCHA</p>
          <p className="drop-hero-status">Pre-orders opening soon</p>
          <div className="hero-buttons"><Link className="btn btn-light" href="/wear">PREVIEW THE DROP</Link></div>
        </div>
        <div className="drop-hero-art">
          <Image src="/wear/ezlipse-black-back.webp.png" alt="Black Eclipse Zip-Up hoodie with the After Dark back graphic" fill preload sizes="(max-width: 700px) 86vw, 53vw" />
        </div>
      </div>
    </section>
    <HomeEvent />
    <HomeEvent past />
    <section className="world section" id="world"><div className="section-index">00 / NOCTIVE</div><div className="world-grid"><div><p className="eyebrow">NOCTIVE / ONE POINT OF VIEW</p><h2>WE CREATE WHAT<br/><span>WE WANT TO SEE.</span></h2></div><div className="copy-block"><p><strong className="inline-strong">NOCTIVE</strong>, also known as <strong className="inline-strong">Noctive Presents</strong>, is an independent creative project based in California. We make limited apparel and build selective live experiences around the things we genuinely want to wear, see and be part of.</p><strong>IF IT FEELS RIGHT FOR NOCTIVE, WE MAKE IT.</strong></div></div></section>
    <section className="divisions section"><div className="section-index">01 / NOCTIVE</div><div className="division-grid division-grid-weighted">{divisions.map(d=><Link className={`division-card ${d.featured?"division-card-featured":""}`} href={d.href} key={d.name}><div className="division-scan"/><div className="division-topline"><span>{d.number}</span><span>{d.status}</span></div><div className="division-name">{d.name}</div><p>{d.copy}</p><span className="division-enter">ENTER ↘</span></Link>)}</div></section>
    <section className="wear-teaser section" id="wear"><div className="section-index">02 / WEAR</div><div className="wear-teaser-card"><div className="wear-teaser-art"><Image className="wear-teaser-hoodie" src="/wear/ezlipse-espresso-back.webp.png" alt="Mocha Eclipse zip-up hoodie, back view featuring the After Dark 001 graphic" fill sizes="(max-width: 900px) 100vw, 34vw"/><div className="wear-art-shade"/><div className="wear-grid-overlay"/><div className="wear-code">NCTV / W-001 / 26</div></div><div className="wear-teaser-copy"><p className="eyebrow">AFTER DARK / DROP 001 / WEAR</p><h2>DROP 001<br/><span>COMING SOON.</span></h2><p>Join the access list to hear when Eclipse Zip-Up pre-orders open.</p><Waitlist compact/><Link className="text-link" href="/wear">EXPLORE DROP 001 ↗</Link></div></div></section>
    <section className="signal section" aria-label="Noctive statement"><div className="signal-track"><span>NOCTIVE</span><i>WE CREATE WHAT WE WANT TO SEE</i><span>DROP 001</span><i>NOCTIVE</i><span>AFTER DARK</span><i>DROP 001</i></div></section>
    <section className="system section"><div className="section-index">03 / STATUS</div><div className="system-grid"><div className="system-lead"><p className="eyebrow">CURRENT STATUS</p><h2>WHAT&apos;S<br/><span>ACTIVE.</span></h2></div><div className="system-list"><Link href="/events" className="system-row"><span>01</span><strong>JUNKIE KID / AFTER DARK 002</strong><em>JAN 16 / LOS ARCOS / FRESNO</em><b>TICKETS ↗</b></Link><Link href="/wear" className="system-row"><span>02</span><strong>AFTER DARK</strong><em>DROP 001 / ACCESS OPEN</em><b>WEAR ↗</b></Link><Link href="/about" className="system-row"><span>03</span><strong>ABOUT</strong><em>WHAT IS NOCTIVE</em><b>READ ↗</b></Link></div></div></section>
    <section className="contact section"><div className="section-index">04 / CONTACT</div><div className="contact-grid"><div><p className="eyebrow">NOCTIVE / INQUIRIES</p><h2>GET IN<br/>TOUCH.</h2></div><div className="contact-links"><a href="mailto:hello@noctivepresents.com">GENERAL <span>hello@noctivepresents.com</span></a><a href="mailto:booking@noctivepresents.com">BOOKING <span>booking@noctivepresents.com</span></a><a href={INSTAGRAM} target="_blank" rel="noreferrer">INSTAGRAM <span>@noctivepresents ↗</span></a><Link href="/contact">CONTACT PAGE <span>OPEN ↗</span></Link></div></div></section>
    <footer><div className="footer-brand"><Image src="/noctive-logo.png" alt="" width={54} height={54}/><span>NOCTIVE</span></div><div className="footer-divisions">WEAR / EVENTS / ABOUT / CONTACT</div><div className="footer-legal"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link></div></footer>
  </main>;
}
