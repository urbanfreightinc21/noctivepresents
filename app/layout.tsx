import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import "./v4.css";

const siteUrl = "https://www.noctivepresents.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NOCTIVE — Apparel, Events & Live Experiences",
    template: "%s — NOCTIVE",
  },
  description:
    "NOCTIVE is an independent California brand creating limited apparel and selective live music experiences.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "NOCTIVE",
    title: "NOCTIVE — Apparel, Events & Live Experiences",
    description:
      "Independent California brand creating limited apparel and selective live music experiences.",
    images: ["/noctive-poster.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NOCTIVE — Apparel, Events & Live Experiences",
    description:
      "Independent California brand creating limited apparel and selective live music experiences.",
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
      alternateName: "Noctive Presents",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/noctive-logo.png`,
      description:
        "NOCTIVE is an independent California brand creating limited apparel and selective live music experiences.",
      sameAs: ["https://www.instagram.com/noctivepresents/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "NOCTIVE",
      alternateName: "Noctive Presents",
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
