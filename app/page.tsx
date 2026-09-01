"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Waitlist from "./Waitlist";

const INSTAGRAM = "https://www.instagram.com/noctivepresents/";

const divisions = [
  {
    number: "01",
    name: "WEAR",
    status: "DROP 001 / ACTIVE",
    copy: "Limited apparel and collaborations made for the hours after dark.",
    href: "/wear",
    featured: true,
  },
  {
    number: "02",
    name: "EVENTS",
    status: "LIVE / SELECTIVE",
    copy: "The nights we’d actually go to — artists, sound, visuals and the room around them.",
    href: "/events",
  },
  {
    number: "03",
    name: "STUDIO",
    status: "SPECIAL PROJECTS",
    copy: "Original concepts, campaign worlds, collaborations and visual projects.",
    href: "/studio",
  },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = soundOn;
    setSoundOn(!soundOn);
    videoRef.current.play().catch(() => {});
  };

  return (
    <main>
      <header className="nav">
        <Link className="nav-brand" href="/" aria-label="Noctive home">
          <Image src="/noctive-logo.png" alt="" width={34} height={34} priority />
          <span>NOCTIVE</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/wear">Wear</Link>
          <Link href="/events">Events</Link>
          <Link href="/studio">Studio</Link>
          <Link href="/archive">Archive</Link>
        </nav>
        <a className="nav-social" href={INSTAGRAM} target="_blank" rel="noreferrer">
          Instagram ↗
        </a>
      </header>

      <section className="hero" id="top">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/noctive-poster.png">
          <source src="/noctive-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="scanline" />
        <div className="noise" />
        <div className="hero-orbit hero-orbit-a" />
        <div className="hero-orbit hero-orbit-b" />

        <div className="hero-corner hero-corner-left">
          NOCTIVE / 2026<br />
          CULTURE AFTER DARK
        </div>
        <div className="hero-corner hero-corner-right">
          DROP 001 / SIGNAL OPEN<br />
          AFTER DARK
        </div>

        <div className="hero-copy">
          <Image className="hero-logo" src="/noctive-logo.png" alt="Noctive" width={260} height={260} priority />
          <p className="hero-kicker">NOCTIVE / DROP 001</p>
          <h1>
            <span>AFTER</span>
            <strong>DARK.</strong>
          </h1>
          <p className="hero-sub">FIRST RELEASE / ACCESS LIST OPEN</p>
          <div className="hero-buttons">
            <Link className="btn btn-light" href="/wear#access">GET DROP ACCESS</Link>
            <a className="btn btn-ghost" href="#world">EXPLORE NOCTIVE</a>
          </div>
        </div>

        <button className="sound-toggle" onClick={toggleSound}>
          {soundOn ? "SOUND ON" : "SOUND OFF"}
        </button>
        <a className="scroll" href="#world"><span />Scroll</a>
      </section>

      <section className="world section" id="world">
        <div className="section-index">00 / NOCTIVE</div>
        <div className="world-grid">
          <div>
            <p className="eyebrow">NOCTIVE / ONE POINT OF VIEW</p>
            <h2>WE MAKE WHAT<br /><span>WE WANT.</span></h2>
          </div>
          <div className="copy-block">
            <p>
              The clothes we’d wear. The nights we’d go to. The visuals we’d keep.
              Noctive is one point of view across all of it.
            </p>
            <p>
              Right now that point of view starts with <strong className="inline-strong">After Dark</strong> — our first apparel release.
            </p>
            <strong>BUILT FOR AFTER DARK.</strong>
          </div>
        </div>
      </section>

      <section className="divisions section">
        <div className="section-index">01 / NOCTIVE</div>
        <div className="division-grid division-grid-weighted">
          {divisions.map((division) => (
            <Link className={`division-card ${division.featured ? "division-card-featured" : ""}`} href={division.href} key={division.name}>
              <div className="division-scan" />
              <div className="division-topline">
                <span>{division.number}</span>
                <span>{division.status}</span>
              </div>
              <div className="division-name">{division.name}</div>
              <p>{division.copy}</p>
              <span className="division-enter">ENTER ↘</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wear section" id="wear">
        <div className="section-index">02 / DROP 001</div>
        <div className="wear-stage">
          <div className="wear-art">
            <Image src="/after-dark-teaser.png" alt="After Dark collection teaser — Noctive" fill sizes="(max-width: 900px) 100vw, 58vw" priority />
            <div className="wear-art-shade" />
            <div className="wear-grid-overlay" />
            <div className="wear-code">NCTV / W-001 / 26</div>
            <div className="wear-teaser-label">VISUAL 001 / AFTER DARK</div>
          </div>
          <div className="wear-copy">
            <p className="eyebrow">DROP 001 / ACCESS LIST OPEN</p>
            <h2>AFTER DARK</h2>
            <p className="wear-lead">
              The first Noctive apparel release. Details surface in stages. The access list gets the first notice.
            </p>
            <div className="drop-meta">
              <span>NOCTIVE / WEAR</span>
              <span>COLLECTION 001</span>
              <span>LIMITED RELEASE</span>
              <span>DATE / UNANNOUNCED</span>
            </div>
            <Waitlist compact />
            <Link className="text-link" href="/wear">EXPLORE DROP 001 ↗</Link>
          </div>
        </div>
      </section>

      <section className="signal section" aria-label="Noctive statement">
        <div className="signal-track">
          <span>NOCTIVE</span><i>AFTER DARK</i><span>DROP 001</span><i>NOCTIVE</i><span>AFTER DARK</span><i>DROP 001</i>
        </div>
      </section>

      <section className="system section">
        <div className="section-index">03 / STATUS</div>
        <div className="system-grid">
          <div className="system-lead">
            <p className="eyebrow">CURRENT SIGNAL</p>
            <h2>FIRST<br /><span>SIGNAL.</span></h2>
          </div>
          <div className="system-list">
            <Link href="/wear" className="system-row"><span>01</span><strong>AFTER DARK</strong><em>DROP 001 / ACCESS OPEN</em><b>WEAR ↗</b></Link>
            <Link href="/events" className="system-row"><span>02</span><strong>EVENTS</strong><em>NEXT DATE / UNANNOUNCED</em><b>OPEN ↗</b></Link>
            <Link href="/studio" className="system-row"><span>03</span><strong>STUDIO</strong><em>PROJECTS / DEVELOPING</em><b>OPEN ↗</b></Link>
          </div>
        </div>
      </section>

      <section className="contact section">
        <div className="section-index">04 / CONTACT</div>
        <div className="contact-grid">
          <div>
            <p className="eyebrow">NOCTIVE / INQUIRIES</p>
            <h2>STAY<br />CLOSE.</h2>
          </div>
          <div className="contact-links">
            <a href="mailto:hello@noctivepresents.com">GENERAL <span>hello@noctivepresents.com</span></a>
            <a href="mailto:booking@noctivepresents.com">BOOKING <span>booking@noctivepresents.com</span></a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">INSTAGRAM <span>@noctivepresents ↗</span></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <Image src="/noctive-logo.png" alt="" width={54} height={54} />
          <span>NOCTIVE</span>
        </div>
        <div className="footer-divisions">WEAR / EVENTS / STUDIO</div>
        <div className="footer-legal"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link></div>
      </footer>
    </main>
  );
}
