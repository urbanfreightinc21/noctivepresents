import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const INSTAGRAM="https://www.instagram.com/noctivepresents/";
export const metadata:Metadata={title:"Contact",description:"Contact Noctive for general, apparel, collaboration and booking inquiries."};

export default function ContactPage(){return <main className="about-page">
<header className="nav subnav"><Link className="nav-brand" href="/" aria-label="Noctive home"><Image src="/noctive-logo.png" alt="" width={34} height={34} priority/><span>NOCTIVE</span></Link><nav aria-label="Primary navigation"><Link href="/wear">Wear</Link><Link href="/events">Events</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><Link className="nav-social" href="/">Close ↙</Link></header>
<section className="about-hero"><div className="noise"/><div className="scanline"/><div className="about-orbit about-orbit-a"/><div className="about-orbit about-orbit-b"/><div className="about-hero-copy"><p className="eyebrow">NOCTIVE / CONTACT</p><h1>GET IN<br/><span>TOUCH.</span></h1><p className="about-deck">GENERAL / BOOKING / COLLABORATIONS</p></div><div className="about-coordinates">NCTV / CONTACT<br/>CALIFORNIA</div></section>
<section className="section about-pillars"><div className="section-index">01 / INQUIRIES</div><div className="about-pillar-grid"><div><span>01 / GENERAL</span><strong>HELLO.</strong><p>Apparel, collaborations, press, partnerships and general questions.</p><a href="mailto:hello@noctivepresents.com">HELLO@NOCTIVEPRESENTS.COM ↗</a></div><div><span>02 / BOOKING</span><strong>LIVE.</strong><p>Artist, agent, venue and event-related inquiries.</p><a href="mailto:booking@noctivepresents.com">BOOKING@NOCTIVEPRESENTS.COM ↗</a></div><div><span>03 / SOCIAL</span><strong>FOLLOW.</strong><p>Releases, announcements and what Noctive is currently building.</p><a href={INSTAGRAM} target="_blank" rel="noreferrer">@NOCTIVEPRESENTS ↗</a></div></div></section>
<section className="about-closing"><div className="about-closing-line">NOCTIVE / DIRECT LINE</div><h2>MAKE SOMETHING<br/><span>WORTH MAKING.</span></h2><p>For everything else, start with hello@noctivepresents.com.</p></section>
<footer><div className="footer-brand"><Image src="/noctive-logo.png" alt="" width={54} height={54}/><span>NOCTIVE</span></div><div className="footer-divisions">WEAR / EVENTS / ABOUT / CONTACT</div><div className="footer-legal"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link></div></footer>
</main>}
