import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About", description: "Noctive is an independent California creative project spanning limited apparel and selective live experiences." };

export default function AboutPage() {
  return <main className="about-page">
    <header className="nav subnav">
      <Link className="nav-brand" href="/" aria-label="Noctive home"><Image src="/noctive-logo.png" alt="" width={34} height={34} priority /><span>NOCTIVE</span></Link>
      <nav aria-label="Primary navigation"><Link href="/wear">Wear</Link><Link href="/events">Events</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>
      <Link className="nav-social" href="/">Close ↙</Link>
    </header>

    <section className="about-hero">
      <div className="noise" /><div className="scanline" /><div className="about-orbit about-orbit-a" /><div className="about-orbit about-orbit-b" />
      <div className="about-hero-copy"><p className="eyebrow">NOCTIVE / ABOUT / CALIFORNIA</p><h1>WE CREATE<br /><span>WHAT WE WANT TO SEE.</span></h1><p className="about-deck">LIMITED APPAREL / SELECTIVE LIVE EXPERIENCES</p></div>
      <div className="about-coordinates">NCTV / INDEPENDENT<br />EST. 2026</div>
    </section>

    <section className="section about-manifesto"><div className="section-index">01 / WHAT IS NOCTIVE</div><div className="about-manifesto-grid"><h2>NO FORMULA.<br /><span>ONE POINT OF VIEW.</span></h2><div><p>Noctive is an independent creative project based in California, spanning limited apparel and selective live experiences.</p><p>There isn&apos;t a complicated formula behind it. We make the clothes we want to wear, bring the artists we want to see, and build the kind of experiences we would actually want to be part of.</p><strong>IF IT FEELS RIGHT FOR NOCTIVE, WE MAKE IT.</strong></div></div></section>

    <section className="section about-pillars"><div className="section-index">02 / WHAT WE DO</div><div className="about-pillar-grid"><div><span>01 / WEAR</span><strong>WHAT WE<br />WANT TO WEAR.</strong><p>Limited apparel developed on our terms. The first release is Drop 001: After Dark.</p><Link href="/wear">ENTER WEAR ↗</Link></div><div><span>02 / EVENTS</span><strong>WHO WE<br />WANT TO SEE.</strong><p>Selective live experiences built around artists, sound, production and rooms we genuinely want to experience ourselves.</p><Link href="/events">ENTER EVENTS ↗</Link></div><div><span>03 / NOCTIVE</span><strong>ONE<br />POINT OF VIEW.</strong><p>The creative direction, campaigns and collaborations exist to support the things we make — not as a separate division.</p><Link href="/archive">VIEW ARCHIVE ↗</Link></div></div></section>

    <section className="about-closing"><div className="about-closing-line">NOCTIVE / 2026 / CALIFORNIA / INDEPENDENT</div><h2>MAKE WHAT<br /><span>YOU WANT TO EXIST.</span></h2><p>That is the idea. Everything else follows from it.</p></section>

    <footer><div className="footer-brand"><Image src="/noctive-logo.png" alt="" width={54} height={54} /><span>NOCTIVE</span></div><div className="footer-divisions">WEAR / EVENTS / ABOUT / CONTACT</div><div className="footer-legal"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link></div></footer>
  </main>;
}
