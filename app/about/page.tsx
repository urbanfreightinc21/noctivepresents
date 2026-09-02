import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "About", description: "Noctive is an independent California label spanning apparel, live events and visual culture." };

export default function AboutPage() {
  return <main className="about-page">
    <header className="nav subnav">
      <Link className="nav-brand" href="/" aria-label="Noctive home"><Image src="/noctive-logo.png" alt="" width={34} height={34} priority /><span>NOCTIVE</span></Link>
      <nav aria-label="Primary navigation"><Link href="/wear">Wear</Link><Link href="/events">Events</Link><Link href="/about">About</Link><Link href="/archive">Archive</Link></nav>
      <Link className="nav-social" href="/">Close ↙</Link>
    </header>

    <section className="about-hero">
      <div className="noise" /><div className="scanline" /><div className="about-orbit about-orbit-a" /><div className="about-orbit about-orbit-b" />
      <div className="about-hero-copy"><p className="eyebrow">NOCTIVE / ABOUT / CALIFORNIA</p><h1>BUILT FOR<br /><span>AFTER DARK.</span></h1><p className="about-deck">APPAREL / LIVE EVENTS / VISUAL CULTURE</p></div>
      <div className="about-coordinates">NCTV / SYSTEM 001<br />EST. 2026</div>
    </section>

    <section className="section about-manifesto"><div className="section-index">01 / WHAT IS NOCTIVE</div><div className="about-manifesto-grid"><h2>ONE WORLD.<br /><span>THREE FORMS.</span></h2><div><p>Noctive is an independent California label built around the culture that exists after dark.</p><p>We make limited apparel, build selective live experiences, and develop the visual language connecting both. Not separate projects under one name — one point of view expressed in different forms.</p><strong>THE CLOTHES WE’D WEAR. THE NIGHTS WE’D GO TO. THE VISUALS WE’D KEEP.</strong></div></div></section>

    <section className="section about-pillars"><div className="section-index">02 / THE SYSTEM</div><div className="about-pillar-grid"><div><span>01 / WEAR</span><strong>LIMITED<br />RELEASES.</strong><p>Apparel designed as part of the Noctive world, beginning with Drop 001: After Dark.</p><Link href="/wear">ENTER WEAR ↗</Link></div><div><span>02 / EVENTS</span><strong>SELECTIVE<br />NIGHTS.</strong><p>Artist-led rooms where sound, production, visuals and atmosphere are treated as one experience.</p><Link href="/events">ENTER EVENTS ↗</Link></div><div><span>03 / CULTURE</span><strong>ONE VISUAL<br />LANGUAGE.</strong><p>Campaigns, collaborations and creative work that connect what we wear with where we go.</p><Link href="/archive">VIEW ARCHIVE ↗</Link></div></div></section>

    <section className="about-closing"><div className="about-closing-line">NOCTIVE / 2026 / CALIFORNIA / AFTER DARK</div><h2>WE’RE NOT HERE TO<br /><span>FILL A CALENDAR.</span></h2><p>We release or build something when it belongs in the world.</p></section>

    <footer><div className="footer-brand"><Image src="/noctive-logo.png" alt="" width={54} height={54} /><span>NOCTIVE</span></div><div className="footer-divisions">WEAR / EVENTS / ABOUT</div><div className="footer-legal"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link></div></footer>
  </main>;
}
