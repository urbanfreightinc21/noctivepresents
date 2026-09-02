import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import "./v4.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.noctivepresents.com"),
  title: {
    default: "NOCTIVE",
    template: "%s — NOCTIVE",
  },
  description: "NOCTIVE is an independent California creative project spanning limited apparel and selective live experiences.",
  openGraph: {
    title: "NOCTIVE",
    description: "Limited apparel and selective live experiences from NOCTIVE.",
    images: ["/noctive-poster.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
