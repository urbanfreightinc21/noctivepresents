import Image from "next/image";
import Link from "next/link";

export default function HomeEvent() {
  return (
    <section className="section home-event" id="next-event" aria-labelledby="home-next-event">
      <div className="wear-teaser-card">
        <div className="home-event-art">
          <Image
            src="/events/JUNKIE KID FLYER DRAFT 6 FINAL copy.jpg"
            alt="Junkie Kid After Dark 002 event flyer"
            fill
            sizes="(max-width: 700px) 65vw, 33vw"
          />
        </div>
        <div className="wear-teaser-copy">
          <p className="eyebrow">NEXT EVENT / AFTER DARK 002</p>
          <h2 id="home-next-event">JUNKIE <span>KID</span></h2>
          <p>January 16, 2027 · Los Arcos · Fresno<br />8 PM–2 AM · 18+</p>
          <p>Noctive × Night Pulze</p>
          <Link className="btn btn-light" href="/events/junkie-kid-after-dark-002#tickets">BUY TICKETS</Link>
        </div>
      </div>
    </section>
  );
}
