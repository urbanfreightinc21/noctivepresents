import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const INSTAGRAM = "https://www.instagram.com/noctivepresents/";
function SiteHeader() {
  return (
    <header className="nav subnav">
      <Link className="nav-brand" href="/" aria-label="Noctive home">
        <Image src="/noctive-logo.png" alt="" width={34} height={34} priority />
        <span>NOCTIVE</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/wear">Wear</Link>
        <Link href="/events">Events</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link className="nav-social" href="/">Close ↙</Link>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <Image src="/noctive-logo.png" alt="" width={54} height={54} />
        <span>NOCTIVE</span>
      </div>
      <div className="footer-divisions">WEAR / EVENTS / ABOUT / CONTACT</div>
      <div className="footer-legal"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link></div>
    </footer>
  );
}


function IkuEventPage() {
  return (
    <main className="subpage">
      <SiteHeader />
      <section className="subhero subhero-clean event-live-hero">
        <div className="noise" /><div className="event-orbit event-orbit-one" /><div className="event-orbit event-orbit-two" />
        <div className="subhero-copy">
          <p className="eyebrow">NOCTIVE PRESENTS</p>
          <h1>IKU:<br /><span>AFTER DARK 001.</span></h1>
          <div className="subhero-bottom"><span>NOVEMBER 21, 2026</span><span>FULTON 55 / FRESNO, CA</span><span>9PM–2AM / 21+</span></div>
        </div>
      </section>

      <section className="section events-status">
        <div className="section-index">01 / EVENT 001</div>
        <div className="events-status-grid">
          <div><span className="status-dot" /><p className="eyebrow">TICKETS / ON SALE</p><h2>IKU:<br />FRESNO.</h2></div>
          <div className="events-note">
            <p>IKU makes his Fresno debut at Fulton 55 with Noctive. A night of trap, bass and high-energy electronic music with support from Jole, MVSTY, Dayfish and Skatemesa.</p>
            <div className="event-meta-list">
              <span><b>DATE</b>NOV 21, 2026</span>
              <span><b>VENUE</b>FULTON 55</span>
              <span><b>LOCATION</b>FRESNO, CA</span>
              <span><b>TIME</b>9PM–2AM</span>
              <span><b>AGE</b>21+</span>
            </div>
            <a className="text-link" href="#tickets">BUY TICKETS ↓</a>
          </div>
        </div>
      </section>

      <section className="section event-checkout" id="tickets">
        <div className="section-index">02 / TICKETS</div>
        <div className="event-checkout-grid">
          <div className="event-checkout-copy">
            <p className="eyebrow">NOCTIVE / TICKETS</p>
            <h2>BUY<br /><span>TICKETS.</span></h2>
            <p>Presale and release pricing is available while quantities last.</p>
            <a className="text-link" href="https://posh.vip/e/iku-after-dark-001-fresno" target="_blank" rel="noreferrer">OPEN POSH DIRECTLY ↗</a>
          </div>
          <div className="event-checkout-frame">
            <iframe
              src="https://posh.vip/embed/checkout/iku-after-dark-001-fresno"
              height="700"
              width="100%"
              style={{ border: "none" }}
              title="IKU: After Dark 001 — Fresno ticket checkout"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section event-wear-teaser">
        <div className="section-index">03 / WEAR</div>
        <div className="event-wear-teaser-grid">
          <div>
            <p className="eyebrow">AFTER DARK / DROP 001 / WEAR</p>
            <h2>DROP 001<br /><span>COMING NEXT.</span></h2>
          </div>
          <div>
            <p>Limited Noctive apparel is planned ahead of the show. Release details will be announced separately from the event.</p>
            <Link className="text-link" href="/wear">GET DROP ACCESS ↗</Link>
          </div>
        </div>
      </section>

      <section className="section event-system">
        <div className="section-index">04 / NOCTIVE</div>
        <div className="event-format-grid">
          <div><span>01</span><strong>IKU</strong><p>Fresno debut. Headline set at Fulton 55.</p></div>
          <div><span>02</span><strong>SUPPORT</strong><p>Jole / MVSTY / Dayfish / Skatemesa.</p></div>
          <div><span>03</span><strong>FULTON 55</strong><p>875 Divisadero St, Fresno, California.</p></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}


function JunkieKidEventPage() {
  return (
    <main className="subpage noctive-junkie-detail">
      <SiteHeader />
      <section className="subhero subhero-clean noctive-junkie-hero">
        <div className="noise" /><div className="event-orbit event-orbit-one" />
        <div className="subhero-copy">
          <p className="eyebrow">NOCTIVE × NIGHT PULZE / AFTER DARK 002</p>
          <h1>JUNKIE<br /><span>KID.</span></h1>
          <div className="subhero-bottom"><span>JANUARY 16, 2027</span><span>LOS ARCOS / FRESNO, CA</span><span>8PM–2AM / 18+</span></div>
        </div>
      </section>
      <section className="section events-status">
        <div className="section-index">01 / EVENT 002</div>
        <div className="events-status-grid">
          <div><span className="status-dot" /><p className="eyebrow">TICKETS / ON SALE</p><h2>JUNKIE<br />KID.</h2></div>
          <div className="events-note">
            <p>NOCTIVE × NIGHT PULZE present JUNKIE KID: After Dark 002 at Los Arcos in Fresno on January 16, 2027.</p>
            <p>With support from JOLE, ROCKY, VEGA &amp; RAWNY.</p>
            <div className="event-meta-list">
              <span><b>DATE</b>JAN 16, 2027</span>
              <span><b>VENUE</b>LOS ARCOS</span>
              <span><b>LOCATION</b>FRESNO, CA</span>
              <span><b>TIME</b>8PM–2AM</span>
              <span><b>AGE</b>18+</span>
            </div>
            <a className="text-link" href="#tickets">BUY TICKETS ↓</a>
          </div>
        </div>
      </section>
      <section className="section event-checkout" id="tickets">
        <div className="section-index">02 / TICKETS</div>
        <div className="event-checkout-grid">
          <div className="event-checkout-copy">
            <p className="eyebrow">AFTER DARK 002 / TICKETS</p>
            <h2>BUY<br /><span>TICKETS.</span></h2>
            <p>Book securely through Posh. Availability and pricing are shown in the checkout.</p>
            <a className="text-link" href="https://posh.vip/e/junkie-kid-after-dark-002-fresno" target="_blank" rel="noreferrer">OPEN POSH DIRECTLY ↗</a>
          </div>
          <div className="event-checkout-frame">
            <iframe
              src="https://posh.vip/embed/checkout/junkie-kid-after-dark-002-fresno"
              height="700"
              width="100%"
              style={{ border: "none" }}
              title="Junkie Kid: After Dark 002 — Fresno ticket checkout"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section className="section event-system">
        <div className="section-index">03 / LINEUP</div>
        <div className="event-format-grid">
          <div><span>01</span><strong>JUNKIE KID</strong><p>After Dark 002 / Headliner.</p></div>
          <div><span>02</span><strong>SUPPORT</strong><p>Jole / Rocky / Vega / Rawny.</p></div>
          <div><span>03</span><strong>LOS ARCOS</strong><p>Fresno, California / 18+.</p></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
const slugs = ["iku-after-dark-001", "junkie-kid-after-dark-002"] as const;
export function generateStaticParams() { return slugs.map(slug => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "iku-after-dark-001") return { title: "IKU: After Dark 001 — Fresno", description: "IKU at Fulton 55, Fresno, November 21, 2026. 9PM–2AM. 21+.", alternates: { canonical: "/events/iku-after-dark-001" } };
  if (slug === "junkie-kid-after-dark-002") return { title: "Junkie Kid: After Dark 002 — Fresno", description: "Noctive x Night Pulze present Junkie Kid with Jole, Rocky, Vega and Rawny at Los Arcos in Fresno, January 16, 2027. 8PM–2AM. 18+.", alternates: { canonical: "/events/junkie-kid-after-dark-002" } };
  return { title: "Events" };
}
export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "iku-after-dark-001") return <IkuEventPage />;
  if (slug === "junkie-kid-after-dark-002") return <JunkieKidEventPage />;
  notFound();
}
