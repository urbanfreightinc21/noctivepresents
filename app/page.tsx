"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Waitlist from "./Waitlist";

const INSTAGRAM = "https://www.instagram.com/noctivepresents/";
const divisions = [
  { number:"01", name:"EVENTS", status:"NOV 21 / FRESNO", copy:"IKU: After Dark 001 at Fulton 55. Fresno, California. November 21, 2026.", href:"/events", featured:true },
  { number:"02", name:"WEAR", status:"DROP 001 / ACTIVE", copy:"After Dark Drop 001. Limited apparel from Noctive, with release details coming next.", href:"/wear" },
  { number:"03", name:"ABOUT", status:"NOCTIVE / INDEPENDENT", copy:"Why we make what we make — and the point of view connecting it all.", href:"/about" },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null); const [soundOn,setSoundOn]=useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Instagram's iOS browser can ignore the first autoplay request while the
    // page or video is still loading. Retry at each useful lifecycle point.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const tryPlay = () => {
      if (!video.paused) return;
      void video.play().catch(() => {
        // A first touch/pointer event below provides the user gesture iOS may
        // require. The poster remains visible if playback is still blocked.
      });
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    tryPlay();
    const retryTimers = [250, 750, 1500, 3000].map((delay) =>
      window.setTimeout(tryPlay, delay),
    );
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    window.addEventListener("pageshow", tryPlay);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("touchstart", tryPlay, { passive: true, once: true });
    document.addEventListener("pointerdown", tryPlay, { passive: true, once: true });

    return () => {
      retryTimers.forEach(window.clearTimeout);
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      window.removeEventListener("pageshow", tryPlay);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("pointerdown", tryPlay);
    };
  }, []);
  const toggleSound=()=>{if(!videoRef.current)return;videoRef.current.muted=soundOn;setSoundOn(!soundOn);videoRef.current.play().catch(()=>{});};
  return <main>
    <header className="nav"><Link className="nav-brand" href="/" aria-label="Noctive home"><Image src="/noctive-logo.png" alt="" width={34} height={34} priority/><span>NOCTIVE</span></Link><nav aria-label="Primary navigation"><Link href="/wear">Wear</Link><Link href="/events">Events</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><a className="nav-social" href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram ↗</a></header>
    <section className="hero" id="top"><video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/noctive-poster.png"><source src="/noctive-hero.mp4" type="video/mp4"/></video><div className="hero-overlay"/><div className="scanline"/><div className="noise"/><div className="hero-orbit hero-orbit-a"/><div className="hero-orbit hero-orbit-b"/><div className="hero-corner hero-corner-left">NOCTIVE / 2026<br/>INDEPENDENT / CALIFORNIA</div><div className="hero-corner hero-corner-right">NOV 21 / FULTON 55<br/>FRESNO, CALIFORNIA</div><div className="hero-copy"><Image className="hero-logo" src="/noctive-logo.png" alt="Noctive" width={260} height={260} priority/><p className="hero-kicker">NOCTIVE PRESENTS / NOV 21</p><h1><span>IKU:</span><strong>AFTER DARK 001</strong></h1><p className="hero-sub">FULTON 55 / FRESNO / 9PM–2AM / 21+</p><div className="hero-buttons"><Link className="btn btn-light" href="/events#tickets">BUY TICKETS</Link><Link className="btn btn-ghost" href="/events">EVENT DETAILS</Link></div></div><button className="sound-toggle" onClick={toggleSound}>{soundOn?"SOUND ON":"SOUND OFF"}</button><a className="scroll" href="#world"><span/>Scroll</a></section>
    <section className="world section" id="world"><div className="section-index">00 / NOCTIVE</div><div className="world-grid"><div><p className="eyebrow">NOCTIVE / ONE POINT OF VIEW</p><h2>WE CREATE WHAT<br/><span>WE WANT TO SEE.</span></h2></div><div className="copy-block"><p><strong className="inline-strong">NOCTIVE</strong>, also known as <strong className="inline-strong">Noctive Presents</strong>, is an independent creative project based in California. We make limited apparel and build selective live experiences around the things we genuinely want to wear, see and be part of.</p><p>Right now, Noctive is focused on <strong className="inline-strong">IKU: After Dark 001</strong> at Fulton 55 on November 21. <strong className="inline-strong">After Dark Drop 001</strong>, our first apparel release, follows next.</p><strong>IF IT FEELS RIGHT FOR NOCTIVE, WE MAKE IT.</strong></div></div></section>
    <section className="divisions section"><div className="section-index">01 / NOCTIVE</div><div className="division-grid division-grid-weighted">{divisions.map(d=><Link className={`division-card ${d.featured?"division-card-featured":""}`} href={d.href} key={d.name}><div className="division-scan"/><div className="division-topline"><span>{d.number}</span><span>{d.status}</span></div><div className="division-name">{d.name}</div><p>{d.copy}</p><span className="division-enter">ENTER ↘</span></Link>)}</div></section>
    <section className="wear section" id="wear"><div className="section-index">02 / DROP 001</div><div className="wear-stage"><div className="wear-art"><Image src="/after-dark-teaser.png" alt="After Dark collection teaser — Noctive" fill sizes="(max-width: 900px) 100vw, 58vw" priority/><div className="wear-art-shade"/><div className="wear-grid-overlay"/><div className="wear-code">NCTV / W-001 / 26</div><div className="wear-teaser-label">DROP 001 / AFTER DARK</div></div><div className="wear-copy"><p className="eyebrow">DROP 001 / ACCESS LIST OPEN</p><h2>AFTER DARK</h2><p className="wear-lead">The first Noctive apparel release. Details will be revealed in stages. The access list gets the first notice.</p><div className="drop-meta"><span>NOCTIVE / WEAR</span><span>DROP 001</span><span>LIMITED RELEASE</span><span>DATE / UNANNOUNCED</span></div><Waitlist compact/><Link className="text-link" href="/wear">EXPLORE DROP 001 ↗</Link></div></div></section>
    <section className="signal section" aria-label="Noctive statement"><div className="signal-track"><span>NOCTIVE</span><i>WE CREATE WHAT WE WANT TO SEE</i><span>DROP 001</span><i>NOCTIVE</i><span>AFTER DARK</span><i>DROP 001</i></div></section>
    <section className="system section"><div className="section-index">03 / STATUS</div><div className="system-grid"><div className="system-lead"><p className="eyebrow">CURRENT STATUS</p><h2>WHAT&apos;S<br/><span>ACTIVE.</span></h2></div><div className="system-list"><Link href="/events" className="system-row"><span>01</span><strong>IKU / AFTER DARK 001</strong><em>NOV 21 / FULTON 55 / FRESNO</em><b>TICKETS ↗</b></Link><Link href="/wear" className="system-row"><span>02</span><strong>AFTER DARK</strong><em>DROP 001 / ACCESS OPEN</em><b>WEAR ↗</b></Link><Link href="/about" className="system-row"><span>03</span><strong>ABOUT</strong><em>WHAT IS NOCTIVE</em><b>READ ↗</b></Link></div></div></section>
    <section className="contact section"><div className="section-index">04 / CONTACT</div><div className="contact-grid"><div><p className="eyebrow">NOCTIVE / INQUIRIES</p><h2>GET IN<br/>TOUCH.</h2></div><div className="contact-links"><a href="mailto:hello@noctivepresents.com">GENERAL <span>hello@noctivepresents.com</span></a><a href="mailto:booking@noctivepresents.com">BOOKING <span>booking@noctivepresents.com</span></a><a href={INSTAGRAM} target="_blank" rel="noreferrer">INSTAGRAM <span>@noctivepresents ↗</span></a><Link href="/contact">CONTACT PAGE <span>OPEN ↗</span></Link></div></div></section>
    <footer><div className="footer-brand"><Image src="/noctive-logo.png" alt="" width={54} height={54}/><span>NOCTIVE</span></div><div className="footer-divisions">WEAR / EVENTS / ABOUT / CONTACT</div><div className="footer-legal"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link></div></footer>
  </main>;
}
