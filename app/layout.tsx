import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import "./v4.css";
import "./events.css";
import "./eclipse-wear.css";
import "./nvwear.css";

const siteUrl = "https://www.noctivepresents.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NOCTIVE — Apparel, Events & Live Experiences",
    template: "%s — NOCTIVE",
  },
  description:
    "NOCTIVE is an independent creative project based in California, spanning limited apparel and selective live experiences.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/noctive-bat.png",
        type: "image/png",
        sizes: "1254x1254",
      },
    ],
    shortcut: "/noctive-bat.png",
    apple: "/noctive-bat.png",
  },
  openGraph: {
    type: "website",
    siteName: "NOCTIVE",
    title: "NOCTIVE — Apparel, Events & Live Experiences",
    description:
      "Independent creative project based in California, spanning limited apparel and selective live experiences.",
    images: ["/noctive-poster.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOCTIVE — Apparel, Events & Live Experiences",
    description:
      "Independent creative project based in California, spanning limited apparel and selective live experiences.",
    images: ["/noctive-poster.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "NOCTIVE",
      alternateName: ["Noctive Presents", "NOCTIVE Presents"],
      url: `${siteUrl}/`,
      logo: `${siteUrl}/noctive-bat.png`,
      description:
        "NOCTIVE is an independent creative project based in California, spanning limited apparel and selective live experiences.",
      sameAs: ["https://www.instagram.com/noctivepresents/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "NOCTIVE",
      alternateName: ["Noctive Presents", "NOCTIVE Presents"],
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
