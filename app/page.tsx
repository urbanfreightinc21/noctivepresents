import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Waitlist from "../Waitlist";

const INSTAGRAM = "https://www.instagram.com/noctivepresents/";
const validSections = ["wear", "events", "studio", "archive", "privacy", "terms"] as const;
type Section = (typeof validSections)[number];

export function generateStaticParams() {
  return validSections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const titles: Record<string, string> = {
    wear: "Wear / After Dark",
    events: "Events",
    studio: "Studio",
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
        <Link href="/studio">Studio</Link>
        <Link href="/archive">Archive</Link>
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
      <div className="footer-divisions">WEAR / EVENTS / STUDIO</div>
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
        <div className="hero-overlay" />
        <div className="scanline" />
        <div className="noise" />
        <div className="subhero-copy">
          <p className="eyebrow">NOCTIVE / WEAR / 001</p>
          <h1>AFTER<br /><span>DARK.</span></h1>
          <div className="subhero-bottom">
            <span>DROP 001</span>
            <span>DATE / UNANNOUNCED</span>
            <span>ACCESS LIST / OPEN</span>
          </div>
        </div>
      </section>

      <section className="section drop-intro" id="access">
        <div className="section-index">01 / ACCESS</div>
        <div className="drop-intro-grid">
          <div>
            <p className="eyebrow">FIRST RELEASE</p>
            <h2>GET THE<br />SIGNAL.</h2>
          </div>
          <div className="drop-access-panel">
            <p className="drop-access-copy">
              No countdown yet. No filler previews. Join the access list and we&apos;ll send the release notice when After Dark is ready.
            </p>
            <Waitlist />
          </div>
        </div>
      </section>

      <section className="section reveal-section">
        <div className="section-index">02 / RELEASE FILE</div>
        <div className="reveal-grid">
          <div className="reveal-card reveal-card-large">
            <span>001 / COLLECTION</span>
            <strong>AFTER DARK</strong>
            <em>FORMING</em>
            <div className="reveal-radar" />
          </div>
          <div className="reveal-card">
            <span>002 / PRODUCT</span>
            <strong>WITHHELD</strong>
            <em>PREVIEW PENDING</em>
          </div>
          <div className="reveal-card">
            <span>003 / CAMPAIGN</span>
            <strong>WITHHELD</strong>
            <em>VISUAL 001 PENDING</em>
          </div>
        </div>
      </section>

      <section className="statement-strip">
        <span>THE FIRST COLLECTION WILL BE SHOWN IN PIECES.</span>
      </section>

      <section className="section wear-notes">
        <div className="section-index">03 / DROP NOTES</div>
        <div className="wear-notes-grid">
          <h2>BUILT AS<br />A LABEL.</h2>
          <div>
            <p>After Dark is the first Noctive apparel release — not event merchandise and not a one-off logo print.</p>
            <p>Designs, campaign imagery and release details will appear here as the collection gets closer.</p>
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
        <div className="noise" />
        <div className="event-orbit event-orbit-one" />
        <div className="event-orbit event-orbit-two" />
        <div className="subhero-copy">
          <p className="eyebrow">NOCTIVE / EVENTS</p>
          <h1>LIVE<br /><span>AFTER DARK.</span></h1>
          <div className="subhero-bottom"><span>SELECTIVE DATES</span><span>2026+</span><span>LOS ANGELES / CA</span></div>
        </div>
      </section>

      <section className="section events-status">
        <div className="section-index">01 / STATUS</div>
        <div className="events-status-grid">
          <div>
            <span className="status-dot" />
            <p className="eyebrow">NO ACTIVE TRANSMISSION</p>
            <h2>NEXT DATE<br />UNANNOUNCED.</h2>
          </div>
          <div className="events-note">
            <p>Noctive events return when there is a reason to build the room. Dates, artists and ticket links will appear here first.</p>
            <a className="text-link" href="mailto:booking@noctivepresents.com">BOOKING / INQUIRIES ↗</a>
          </div>
        </div>
      </section>

      <section className="section event-system">
        <div className="section-index">02 / FORMAT</div>
        <div className="event-format-grid">
          <div><span>01</span><strong>SOUND</strong><p>Artist-led rooms with the production built around the night.</p></div>
          <div><span>02</span><strong>VISUAL</strong><p>Lighting, motion and identity treated as part of the show — not decoration.</p></div>
          <div><span>03</span><strong>ROOM</strong><p>Selective venues and events that fit the Noctive world.</p></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function StudioPage() {
  return (
    <main className="subpage">
      <SiteHeader />
      <section className="subhero subhero-studio">
        <div className="noise" />
        <div className="studio-grid-bg" />
        <div className="studio-cross studio-cross-a">+</div>
        <div className="studio-cross studio-cross-b">+</div>
        <div className="subhero-copy">
          <p className="eyebrow">NOCTIVE / STUDIO</p>
          <h1>BUILD THE<br /><span>WORLD.</span></h1>
          <div className="subhero-bottom"><span>ORIGINAL CONCEPTS</span><span>COLLABORATIONS</span><span>VISUAL PROJECTS</span></div>
        </div>
      </section>

      <section className="section studio-index">
        <div className="section-index">01 / STUDIO INDEX</div>
        <div className="studio-project-list">
          <div><span>001</span><strong>ORIGINAL IP</strong><em>CHARACTERS / WORLDS / STORIES</em></div>
          <div><span>002</span><strong>COLLABORATIONS</strong><em>ARTISTS / BRANDS / LICENSED PROJECTS</em></div>
          <div><span>003</span><strong>CAMPAIGNS</strong><em>FILM / IMAGE / RELEASE SYSTEMS</em></div>
          <div><span>004</span><strong>OBJECTS</strong><em>LIMITED / EXPERIMENTAL / PHYSICAL</em></div>
        </div>
      </section>

      <section className="section studio-manifesto">
        <div className="section-index">02 / PURPOSE</div>
        <div className="studio-manifesto-grid">
          <h2>NOT A<br />CONTENT TAB.</h2>
          <div>
            <p>Studio is where Noctive develops the visual language around the brand — original characters, campaign systems, collaborations and projects that can move between apparel and live experiences.</p>
            <p>Projects appear here when they are real.</p>
          </div>
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
          <h1>EVERYTHING<br /><span>LEAVES A TRACE.</span></h1>
          <div className="subhero-bottom"><span>DROPS</span><span>EVENTS</span><span>PROJECTS</span></div>
        </div>
      </section>

      <section className="section archive-page-list">
        <div className="section-index">01 / INDEX</div>
        <div className="archive-list archive-list-page">
          <Link href="/wear" className="archive-row archive-row-active"><span>001</span><strong>AFTER DARK</strong><em>WEAR / FORMING</em><b>2026 ↗</b></Link>
          <div className="archive-row archive-row-locked"><span>002</span><strong>EVENT ARCHIVE</strong><em>LIVE / INDEXING</em><b>—</b></div>
          <div className="archive-row archive-row-locked"><span>003</span><strong>STUDIO FILES</strong><em>PROJECTS / LOCKED</em><b>—</b></div>
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
      <section className="legal-hero">
        <p className="eyebrow">NOCTIVE / LEGAL</p>
        <h1>PRIVACY<br />POLICY.</h1>
        <p>Effective September 1, 2026</p>
      </section>
      <section className="legal-body">
        <div className="legal-block">
          <h2>01 / INFORMATION WE COLLECT</h2>
          <p>We may collect information you provide directly to us, including your email address, mobile phone number, messages, and information submitted through forms on this website. We may also receive basic technical and usage information when you visit the site.</p>
        </div>
        <div className="legal-block">
          <h2>02 / HOW WE USE INFORMATION</h2>
          <p>We use information to operate the website, manage release and event communications, respond to inquiries, improve Noctive products and experiences, prevent abuse, and comply with legal obligations.</p>
        </div>
        <div className="legal-block">
          <h2>03 / EMAIL &amp; SMS</h2>
          <p>If you opt in to email or SMS marketing, we may send release alerts, product announcements, event notices and other Noctive updates. Email and SMS consent are handled separately. You can unsubscribe from email using the unsubscribe link in a message. You can opt out of SMS at any time by replying STOP; reply HELP for help. Message frequency varies and message and data rates may apply.</p>
        </div>
        <div className="legal-block legal-emphasis">
          <h2>04 / MOBILE INFORMATION</h2>
          <p>Mobile information will not be sold or shared with third parties or affiliates for their own marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with third parties for their own marketing or promotional purposes. We may use service providers that help us operate the messaging service, such as messaging platforms and telecommunications providers, only as needed to provide the service.</p>
        </div>
        <div className="legal-block">
          <h2>05 / SERVICE PROVIDERS</h2>
          <p>We may use vendors that provide website hosting, analytics, email, SMS, ecommerce, payment, fraud-prevention and other operational services. They may process information on our behalf subject to their agreements and applicable law.</p>
        </div>
        <div className="legal-block">
          <h2>06 / RETENTION &amp; SECURITY</h2>
          <p>We retain information for as long as reasonably necessary for the purposes described here, including maintaining consent and opt-out records. We use reasonable administrative and technical measures to protect information, but no system can be guaranteed completely secure.</p>
        </div>
        <div className="legal-block">
          <h2>07 / YOUR CHOICES</h2>
          <p>You may request access, correction or deletion of personal information where applicable. Marketing consent can be withdrawn at any time using the methods described above.</p>
        </div>
        <div className="legal-block">
          <h2>08 / CONTACT</h2>
          <p>Questions about this policy can be sent to <a href="mailto:hello@noctivepresents.com">hello@noctivepresents.com</a>.</p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function TermsPage() {
  return (
    <main className="subpage legal-page">
      <SiteHeader />
      <section className="legal-hero">
        <p className="eyebrow">NOCTIVE / LEGAL</p>
        <h1>TERMS.</h1>
        <p>Effective September 1, 2026</p>
      </section>
      <section className="legal-body">
        <div className="legal-block"><h2>01 / WEBSITE</h2><p>This website is provided for information about Noctive, including apparel, events, projects and releases. Content, availability and features may change without notice.</p></div>
        <div className="legal-block"><h2>02 / INTELLECTUAL PROPERTY</h2><p>Unless otherwise stated, Noctive names, logos, artwork, graphics, text, video and other original site content are owned by or licensed to Noctive and may not be copied, reproduced or commercially used without permission.</p></div>
        <div className="legal-block"><h2>03 / RELEASES &amp; PRODUCTS</h2><p>Product availability, pricing, sizing, release dates and quantities may change before a product is made available for sale. Joining an access list does not guarantee the ability to purchase an item.</p></div>
        <div className="legal-block legal-emphasis"><h2>04 / SMS PROGRAM TERMS</h2><p>By opting in to Noctive text messages, you agree to receive recurring automated marketing and promotional messages, including release alerts and product or event announcements, at the mobile number you provide. Consent is not a condition of purchase. Message frequency varies. Message and data rates may apply. Reply STOP to cancel and HELP for help. Carriers are not liable for delayed or undelivered messages. For support, email <a href="mailto:hello@noctivepresents.com">hello@noctivepresents.com</a>. Your participation is also subject to our <Link href="/privacy">Privacy Policy</Link>.</p></div>
        <div className="legal-block"><h2>05 / LINKS &amp; THIRD-PARTY SERVICES</h2><p>The site may link to third-party platforms for ticketing, commerce, social media, communications or other services. Their terms and privacy practices apply to their services.</p></div>
        <div className="legal-block"><h2>06 / CHANGES</h2><p>We may update these terms as the Noctive website, products and services develop. The effective date above identifies the current version.</p></div>
        <div className="legal-block"><h2>07 / CONTACT</h2><p>Questions about these terms can be sent to <a href="mailto:hello@noctivepresents.com">hello@noctivepresents.com</a>.</p></div>
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
    case "studio": return <StudioPage />;
    case "archive": return <ArchivePage />;
    case "privacy": return <PrivacyPage />;
    case "terms": return <TermsPage />;
  }
}
