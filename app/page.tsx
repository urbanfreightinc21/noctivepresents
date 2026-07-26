"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const INSTAGRAM = "https://www.instagram.com/noctivepresents/";

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

        <nav>
          <a href="#about">About</a>
          <a href="#events">Events</a>
          <a href="#media">Media</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-social" href={INSTAGRAM} target="_blank" rel="noreferrer">
          Instagram
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
        <div className="noise" />

        <div className="hero-copy">
          <Image
            className="hero-logo"
            src="/noctive-logo.png"
            alt="Noctive Presents"
            width={260}
            height={260}
            priority
          />

          <p className="hero-kicker">WE CREATE THE SHOWS WE WANT TO SEE.</p>

          <h1>
            <span>MORE THAN A SHOW.</span>
            <strong>THIS IS NOCTIVE.</strong>
          </h1>

          <p className="hero-sub">GOOD MUSIC. REAL VIBES. SHARED WITH YOU.</p>

          <div className="hero-buttons">
            <a className="btn btn-light" href="#events">VIEW EVENTS</a>
            <a className="btn btn-ghost" href={INSTAGRAM} target="_blank" rel="noreferrer">
              FOLLOW @NOCTIVEPRESENTS
            </a>
          </div>
        </div>

        <button className="sound-toggle" onClick={toggleSound}>
          {soundOn ? "SOUND ON" : "SOUND OFF"}
        </button>

        <a className="scroll" href="#about">
          <span />
          Scroll
        </a>
      </section>

      <section className="split section" id="about">
        <div className="section-index">01 / ABOUT</div>

        <div className="split-grid">
          <h2>
            THE SHOWS
            <br />
            WE ACTUALLY
            <br />
            WANT TO SEE.
          </h2>

          <div className="copy-block">
            <p>
              Noctive is built around the music, artists and atmosphere we
              genuinely care about.
            </p>
            <p>
              No filler. No forced trends. Just real energy, shared with people
              who understand it.
            </p>
            <strong>MORE THAN A SHOW. THIS IS NOCTIVE.</strong>
          </div>
        </div>
      </section>

      <section className="event-feature section" id="events">
        <div className="section-index">02 / EVENTS</div>

        <div className="event-card">
          <Image
            src="/noctive-poster.png"
            alt="Noctive Presents artwork"
            fill
            sizes="100vw"
          />
          <div className="event-shade" />

          <div className="event-content">
            <p>NEXT EVENT</p>
            <h2>ANNOUNCEMENT INCOMING.</h2>
            <span>ARTIST · DATE · LOCATION</span>
            <a className="btn btn-light" href={INSTAGRAM} target="_blank" rel="noreferrer">
              FOLLOW FOR THE DROP
            </a>
          </div>
        </div>
      </section>

      <section className="media section" id="media">
        <div className="section-index">03 / MEDIA</div>

        <div className="media-grid">
          <div className="video-card">
            <video autoPlay muted loop playsInline poster="/noctive-poster.png">
              <source src="/noctive-hero.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="media-copy">
            <p className="eyebrow">NOCTIVE VISUALS</p>
            <h2>THE ENERGY BEFORE THE DOORS EVEN OPEN.</h2>
            <p>
              Event films, crowd moments and announcements will live here as
              Noctive grows.
            </p>
            <a className="text-link" href={INSTAGRAM} target="_blank" rel="noreferrer">
              VIEW INSTAGRAM ↗
            </a>
          </div>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="section-index">04 / CONTACT</div>

        <div className="contact-grid">
          <h2>LET&apos;S BUILD THE NEXT ONE.</h2>

          <div className="contact-links">
            <a href="mailto:hello@noctivepresents.com">
              GENERAL INQUIRIES
              <span>hello@noctivepresents.com</span>
            </a>
            <a href="mailto:booking@noctivepresents.com">
              ARTIST & BOOKING
              <span>booking@noctivepresents.com</span>
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              INSTAGRAM
              <span>@noctivepresents</span>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div>
          <Image src="/noctive-logo.png" alt="" width={54} height={54} />
          <span>NOCTIVE PRESENTS</span>
        </div>
        <p>MORE THAN A SHOW. THIS IS NOCTIVE.</p>
      </footer>
    </main>
  );
}
