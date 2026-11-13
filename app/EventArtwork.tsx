"use client";

import { useState } from "react";

// The supplied official art is used directly. Until the JPEG exists in /public/events,
// the original typographic event card remains visible instead of a broken image.
export default function EventArtwork({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      className={`noctive-event-flyer ${loaded ? "noctive-event-flyer-loaded" : ""}`}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(false)}
      loading="lazy"
      decoding="async"
    />
  );
}
