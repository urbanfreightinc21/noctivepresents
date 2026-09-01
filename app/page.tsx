"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const INSTAGRAM = "https://www.instagram.com/noctivepresents/";

const divisions = [
  {
    number: "01",
    name: "WEAR",
    status: "ACTIVE / DROP 001",
    copy: "Limited apparel, objects and collaborations built inside the Noctive world.",
    href: "#wear",
  },
  {
    number: "02",
    name: "PRESENTS",
    status: "EVENTS / EXPERIENCES",
    copy: "Music, artists and rooms worth remembering. Noctive started here. It stays here.",
    href: "#presents",
  },
  {
    number: "03",
    name: "STUDIO",
    status: "SPECIAL PROJECTS",
    copy: "Original worlds, visual campaigns, artist capsules and future collaborations.",
    href: "#studio",
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
        <a className="nav-brand" href="#top" aria-label="Noctive home">
          <Image src="/noctive-logo.png" alt="" width={34} height={34} priority />
          <span>NOCTIVE</span>
        </a>

        <nav aria-label="Primary navigation">
          <a href="#wear">Wear</a>
          <a href="#presents">Presents</a>
          <a href="#studio">Studio</a>
          <a href="#archive">Archive</a>
        </nav>

        <a className="nav-social" href={INSTAGRAM} target="_blank" rel="noreferrer">
          Instagram ↗
        </a>
      </header>

      <section className="hero" id="top">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/noctive-poster.png"
        >
          <source src="/noctive-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="scanline" />
        <div className="noise" />

        <div className="hero-corner hero-corner-left">
          NOCTIVE / 2026<br />
          CULTURE AFTER DARK
        </div>
        <div className="hero-corner hero-corner-right">
          LOS ANGELES / CA<br />
          SIGNAL 001
        </div>

        <div className="hero-copy">
          <Image
            className="hero-logo"
            src="/noctive-logo.png"
            alt="Noctive"
            width={260}
            height={260}
            priority
          />
          <p className="hero-kicker">NOCTIVE WEAR / COLLECTION 001</p>
          <h1>
            <span>AFTER</span>
            <strong>DARK.</strong>
          </h1>
          <p className="hero-sub">THE FIRST DROP IS FORMING.</p>

          <div className="hero-buttons">
            <a className="btn btn-light" href="#wear">ENTER DROP 001</a>
            <a className="btn btn-ghost" href="#world">EXPLORE NOCTIVE</a>
          </div>
        </div>

        <button className="sound-toggle" onClick={toggleSound}>
          {soundOn ? "SOUND ON" : "SOUND OFF"}
        </button>

        <a className="scroll" href="#world">
          <span />
          Scroll
        </a>
      </section>

      <section className="world section" id="world">
        <div className="section-index">00 / THE WORLD</div>
        <div className="world-grid">
          <div>
            <p className="eyebrow">NOCTIVE IS EXPANDING</p>
            <h2>
              NOT JUST
              <br />
              A SHOW.
            </h2>
          </div>
          <div className="copy-block">
            <p>
              Noctive is a world built around what happens after dark — music,
              design, apparel and the culture around it.
            </p>
            <p>
              Presents remains the live side. Wear becomes the product. Studio
              is where the visual language, characters and collaborations grow.
            </p>
            <strong>ONE NAME. DIFFERENT FORMS.</strong>
          </div>
        </div>
      </section>

      <section className="divisions section">
        <div className="section-index">01 / DIVISIONS</div>
        <div className="division-grid">
          {divisions.map((division) => (
            <a className="division-card" href={division.href} key={division.name}>
              <div className="division-topline">
                <span>{division.number}</span>
                <span>{division.status}</span>
              </div>
              <div className="division-name">{division.name}</div>
              <p>{division.copy}</p>
              <span className="division-enter">ENTER ↘</span>
            </a>
          ))}
        </div>
      </section>

      <section className="wear section" id="wear">
        <div className="section-index">02 / WEAR</div>
        <div className="wear-stage">
          <div className="wear-art">
            <Image
              src="/noctive-poster.png"
              alt="Noctive After Dark collection teaser"
              fill
              sizes="(max-width: 900px) 100vw, 54vw"
            />
            <div className="wear-art-shade" />
            <div className="wear-watermark">AFTER DARK</div>
            <div className="wear-code">NCTV / W-001 / 26</div>
          </div>

          <div className="wear-copy">
            <p className="eyebrow">DROP 001 / COMING SOON</p>
            <h2>AFTER DARK</h2>
            <p className="wear-lead">
              The first Noctive collection. Built as a real label — not event merch.
            </p>
            <div className="drop-meta">
              <span>HEAVYWEIGHT TEES</span>
              <span>HOODIES</span>
              <span>LIMITED OBJECTS</span>
              <span>COLLECTION 001</span>
            </div>
            <p className="wear-note">
              Designs, campaign imagery and release details will surface in stages.
              No fake countdown. No manufactured scarcity. Just the drop when it is ready.
            </p>
            <a className="btn btn-light" href={INSTAGRAM} target="_blank" rel="noreferrer">
              FOLLOW THE DROP ↗
            </a>
          </div>
        </div>
      </section>

      <section className="signal section" aria-label="Noctive statement">
        <div className="signal-track">
          <span>NOCTIVE</span>
          <i>AFTER DARK</i>
          <span>NOCTIVE</span>
          <i>AFTER DARK</i>
          <span>NOCTIVE</span>
        </div>
      </section>

      <section className="presents section" id="presents">
        <div className="section-index">03 / PRESENTS</div>
        <div className="presents-grid">
          <div className="presents-copy">
            <p className="eyebrow">LIVE EXPERIENCES</p>
            <h2>THE NIGHT<br />STARTED HERE.</h2>
            <p>
              Noctive Presents remains our live division — selective events, artists
              and experiences when there is something worth putting into a room.
            </p>
            <div className="status-line">
              <span className="pulse" />
              NEXT TRANSMISSION / PENDING
            </div>
          </div>
          <div className="presents-visual">
            <video autoPlay muted loop playsInline poster="/noctive-poster.png">
              <source src="/noctive-hero.mp4" type="video/mp4" />
            </video>
            <div className="presents-shade" />
            <span>NOCTIVE / PRESENTS</span>
          </div>
        </div>
      </section>

      <section className="studio section" id="studio">
        <div className="section-index">04 / STUDIO</div>
        <div className="studio-shell">
          <div className="studio-heading">
            <p className="eyebrow">ORIGINAL WORLDS / COLLABORATIONS</p>
            <h2>STUDIO</h2>
          </div>
          <div className="studio-copy">
            <p>
              The creative arm of Noctive. A home for original characters, visual
              campaigns, artist capsules, licensed collaborations and limited projects.
            </p>
            <div className="studio-tags">
              <span>ORIGINAL IP</span>
              <span>COLLABS</span>
              <span>CAMPAIGNS</span>
              <span>FILM</span>
              <span>OBJECTS</span>
            </div>
            <span className="coming-label">DEVELOPING / 2026+</span>
          </div>
        </div>
      </section>

      <section className="archive section" id="archive">
        <div className="section-index">05 / ARCHIVE</div>
        <div className="archive-head">
          <h2>EVERYTHING<br />LEAVES A TRACE.</h2>
          <p>
            Future drops, past events, campaigns and collaborations will live here.
            The archive becomes the history of the brand as it grows.
          </p>
        </div>

        <div className="archive-list">
          <div className="archive-row archive-row-active">
            <span>001</span>
            <strong>AFTER DARK</strong>
            <em>WEAR / FORMING</em>
            <b>2026</b>
          </div>
          <div className="archive-row">
            <span>002</span>
            <strong>NOCTIVE PRESENTS</strong>
            <em>LIVE / ARCHIVE</em>
            <b>2026</b>
          </div>
          <div className="archive-row archive-row-locked">
            <span>003</span>
            <strong>CLASSIFIED</strong>
            <em>STUDIO / LOCKED</em>
            <b>—</b>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-index">06 / CONTACT</div>
        <div className="contact-grid">
          <div>
            <p className="eyebrow">NOCTIVE / INQUIRIES</p>
            <h2>ENTER THE<br />WORLD.</h2>
          </div>
          <div className="contact-links">
            <a href="mailto:hello@noctivepresents.com">
              GENERAL
              <span>hello@noctivepresents.com</span>
            </a>
            <a href="mailto:booking@noctivepresents.com">
              PRESENTS / BOOKING
              <span>booking@noctivepresents.com</span>
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              INSTAGRAM
              <span>@noctivepresents ↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <Image src="/noctive-logo.png" alt="" width={54} height={54} />
          <span>NOCTIVE</span>
        </div>
        <div className="footer-divisions">WEAR / PRESENTS / STUDIO</div>
        <p>AFTER DARK / SINCE 2026</p>
      </footer>
    </main>
  );
}
