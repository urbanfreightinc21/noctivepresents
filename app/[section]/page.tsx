import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Waitlist from "../Waitlist";

const INSTAGRAM = "https://www.instagram.com/noctivepresents/";
const validSections = ["wear", "events", "archive", "privacy", "terms"] as const;
type Section = (typeof validSections)[number];

export function generateStaticParams() {
  return validSections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const titles: Record<string, string> = {
    wear: "Wear / Drop 001: After Dark",
    events: "Events",
    archive: "Archive",
    privacy: "Privacy Policy",
    terms: "Terms",
  };
  return { title: titles[section] ?? "NOCTIVE" };
}

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

function WearPage() {
  return (
    <main className="subpage">
      <SiteHeader />
      <section className="subhero subhero-media">
        <video autoPlay muted loop playsInline poster="/noctive-poster.png">
          <source src="/noctive-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" /><div className="scanline" /><div className="noise" />
        <div className="subhero-copy">
          <p className="eyebrow">NOCTIVE / WEAR / DROP 001</p>
          <h1>AFTER<br /><span>DARK.</span></h1>
          <div className="subhero-bottom"><span>DROP 001</span><span>DATE / UNANNOUNCED</span><span>ACCESS LIST / OPEN</span></div>
        </div>
      </section>

      <section className="section drop-intro" id="access">
        <div className="section-index">01 / ACCESS</div>
        <div className="drop-intro-grid">
          <div><p className="eyebrow">FIRST RELEASE</p><h2>GET DROP<br />ACCESS.</h2></div>
          <div className="drop-access-panel">
            <p className="drop-access-copy">Join the email list for the first look, release date and launch notice for Drop 001: After Dark.</p>
            <Waitlist />
          </div>
        </div>
      </section>

      <section className="section reveal-section">
        <div className="section-index">02 / DROP 001</div>
        <div className="reveal-grid">
          <div className="reveal-card reveal-card-large"><span>001 / COLLECTION</span><strong>AFTER DARK</strong><em>COMING SOON</em><div className="reveal-radar" /></div>
          <div className="reveal-card"><span>002 / PRODUCT</span><strong>TO BE REVEALED</strong><em>FIRST LOOK / ACCESS LIST</em></div>
          <div className="reveal-card"><span>003 / RELEASE</span><strong>DATE UNANNOUNCED</strong><em>ACCESS LIST / OPEN</em></div>
        </div>
      </section>

      <section className="statement-strip"><span>DROP 001 DETAILS WILL BE REVEALED IN STAGES. THE ACCESS LIST GETS THE FIRST NOTICE.</span></section>

      <section className="section wear-notes">
        <div className="section-index">03 / ABOUT THE DROP</div>
        <div className="wear-notes-grid">
          <h2>WHAT WE<br />WANT TO WEAR.</h2>
          <div>
            <p>After Dark is Drop 001, the first Noctive apparel release.</p>
            <p>Noctive makes limited apparel we actually want to wear, on our terms and released when it feels right.</p>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="text-link">FOLLOW @NOCTIVEPRESENTS ↗</a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function EventsPage() {
  return (
    <main className="subpage">
      <SiteHeader />
      <section className="subhero subhero-clean">
        <div className="noise" /><div className="event-orbit event-orbit-one" /><div className="event-orbit event-orbit-two" />
        <div className="subhero-copy">
          <p className="eyebrow">NOCTIVE / EVENTS</p>
          <h1>THE NIGHTS<br /><span>WE WANT TO SEE.</span></h1>
          <div className="subhero-bottom"><span>SELECTIVE LIVE EXPERIENCES</span><span>DATES / UNANNOUNCED</span><span>CALIFORNIA</span></div>
        </div>
      </section>

      <section className="section events-status">
        <div className="section-index">01 / STATUS</div>
        <div className="events-status-grid">
          <div><span className="status-dot" /><p className="eyebrow">NO EVENT ANNOUNCED</p><h2>NEXT DATE<br />UNANNOUNCED.</h2></div>
          <div className="events-note">
            <p>Noctive builds selective live experiences around artists, sound, production and rooms we genuinely want to experience ourselves. Dates, artists and ticket links will appear here when announced.</p>
            <a className="text-link" href="mailto:booking@noctivepresents.com">BOOKING / INQUIRIES ↗</a>
          </div>
        </div>
      </section>

      <section className="section event-system">
        <div className="section-index">02 / WHAT WE DO</div>
        <div className="event-format-grid">
          <div><span>01</span><strong>ARTISTS</strong><p>Artists we genuinely want to see.</p></div>
          <div><span>02</span><strong>PRODUCTION</strong><p>Sound, lighting and production built around the experience.</p></div>
          <div><span>03</span><strong>ROOMS</strong><p>Selective venues and nights we would actually want to be part of.</p></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function ArchivePage() {
  return (
    <main className="subpage">
      <SiteHeader />
      <section className="subhero subhero-archive">
        <div className="noise" />
        <div className="subhero-copy">
          <p className="eyebrow">NOCTIVE / ARCHIVE</p>
          <h1>PAST<br /><span>RELEASES & EVENTS.</span></h1>
          <div className="subhero-bottom"><span>WEAR</span><span>EVENTS</span><span>NOCTIVE / 2026+</span></div>
        </div>
      </section>
      <section className="section archive-page-list">
        <div className="section-index">01 / INDEX</div>
        <div className="archive-list archive-list-page">
          <Link href="/wear" className="archive-row archive-row-active"><span>001</span><strong>AFTER DARK</strong><em>DROP 001 / UPCOMING</em><b>2026 ↗</b></Link>
          <div className="archive-row archive-row-locked"><span>002</span><strong>EVENTS</strong><em>NO ARCHIVE YET</em><b>—</b></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function PrivacyPage() {
  return (
    <main className="subpage legal-page">
      <SiteHeader />
      <section className="legal-hero"><p className="eyebrow">NOCTIVE / LEGAL</p><h1>PRIVACY<br />POLICY.</h1><p>Effective September 1, 2026</p></section>
      <section className="legal-body">
        <div className="legal-block"><h2>01 / INFORMATION WE COLLECT</h2><p>We may collect information you provide directly to us, including your email address, messages, and information submitted through forms on this website. We may also receive basic technical and usage information when you visit the site.</p></div>
        <div className="legal-block"><h2>02 / HOW WE USE INFORMATION</h2><p>We use information to operate the website, manage release and event communications, respond to inquiries, improve Noctive products and experiences, prevent abuse, and comply with legal obligations.</p></div>
        <div className="legal-block"><h2>03 / EMAIL</h2><p>If you opt in to email marketing, we may send release alerts, product announcements, event notices and other Noctive updates. You can unsubscribe using the unsubscribe link in a message.</p></div>
        <div className="legal-block"><h2>04 / SERVICE PROVIDERS</h2><p>We may use vendors that provide website hosting, analytics, email, ecommerce, payment, fraud-prevention and other operational services. They may process information on our behalf subject to their agreements and applicable law.</p></div>
        <div className="legal-block"><h2>05 / RETENTION & SECURITY</h2><p>We retain information for as long as reasonably necessary for the purposes described here. We use reasonable administrative and technical measures to protect information, but no system can be guaranteed completely secure.</p></div>
        <div className="legal-block"><h2>06 / YOUR CHOICES</h2><p>You may request access, correction or deletion of personal information where applicable. Marketing consent can be withdrawn at any time.</p></div>
        <div className="legal-block"><h2>07 / CONTACT</h2><p>Questions about this policy can be sent to <a href="mailto:hello@noctivepresents.com">hello@noctivepresents.com</a>.</p></div>
      </section>
      <SiteFooter />
    </main>
  );
}

function TermsPage() {
  return (
    <main className="subpage legal-page">
      <SiteHeader />
      <section className="legal-hero"><p className="eyebrow">NOCTIVE / LEGAL</p><h1>TERMS.</h1><p>Effective September 1, 2026</p></section>
      <section className="legal-body">
        <div className="legal-block"><h2>01 / WEBSITE</h2><p>This website is provided for information about Noctive, including apparel, events and releases. Content, availability and features may change without notice.</p></div>
        <div className="legal-block"><h2>02 / INTELLECTUAL PROPERTY</h2><p>Unless otherwise stated, Noctive names, logos, artwork, graphics, text, video and other original site content are owned by or licensed to Noctive and may not be copied, reproduced or commercially used without permission.</p></div>
        <div className="legal-block"><h2>03 / RELEASES & PRODUCTS</h2><p>Product availability, pricing, sizing, release dates and quantities may change before a product is made available for sale. Joining an access list does not guarantee the ability to purchase an item.</p></div>
        <div className="legal-block"><h2>04 / EVENTS</h2><p>Event dates, artists, venues, ticket availability and other details are subject to change. Additional ticketing or venue terms may apply when events are announced.</p></div>
        <div className="legal-block"><h2>05 / THIRD-PARTY SERVICES</h2><p>The site may link to third-party services. Noctive is not responsible for third-party websites, platforms or their separate terms and policies.</p></div>
        <div className="legal-block"><h2>06 / CONTACT</h2><p>Questions about these terms can be sent to <a href="mailto:hello@noctivepresents.com">hello@noctivepresents.com</a>.</p></div>
      </section>
      <SiteFooter />
    </main>
  );
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!validSections.includes(section as Section)) notFound();
  switch (section as Section) {
    case "wear": return <WearPage />;
    case "events": return <EventsPage />;
    case "archive": return <ArchivePage />;
    case "privacy": return <PrivacyPage />;
    case "terms": return <TermsPage />;
    default: notFound();
  }
}
