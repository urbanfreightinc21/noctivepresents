import Image from "next/image";
import Link from "next/link";

export default function HomeEvent({ past = false }: { past?: boolean }) {
  const flyer = past
    ? "/events/iku-after-dark-001.jpg"
    : "/events/JUNKIE KID FLYER DRAFT 6 FINAL copy.jpg";

  return (
    <section className={`section home-event ${past ? "home-event-past" : ""}`} aria-labelledby={past ? "home-recap" : "home-next-event"}>
      <div className="wear-teaser-card">
        <div className="home-event-art">
          <Image
            src={flyer}
            alt={past ? "IKU After Dark 001 event flyer" : "Junkie Kid After Dark 002 event flyer"}
            fill
            sizes="(max-width: 700px) 65vw, 33vw"
          />
        </div>
        <div className="wear-teaser-copy">
          <p className="eyebrow">{past ? "PAST EVENT / AFTER DARK 001" : "NEXT EVENT / AFTER DARK 002"}</p>
          {past ? (
            <>
              <h2 id="home-recap">IKU</h2>
              <p>November 21, 2026 · Fulton 55 · Fresno</p>
              <p>Thank you, Fresno, for showing up for our first After Dark.</p>
              <Link className="text-link" href="/events/iku-after-dark-001">VIEW RECAP</Link>
            </>
          ) : (
            <>
              <h2 id="home-next-event">JUNKIE <span>KID</span></h2>
              <p>January 16, 2027 · Los Arcos · Fresno<br />8 PM–2 AM · 18+</p>
              <p>Noctive × Night Pulze</p>
              <Link className="btn btn-light" href="/events/junkie-kid-after-dark-002#tickets">BUY TICKETS</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
