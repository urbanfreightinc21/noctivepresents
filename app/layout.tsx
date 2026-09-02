import type { Metadata } from "next";
import "./globals.css";
import "./polish.css";
import "./v4.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.noctivepresents.com"),
  title: {
    default: "NOCTIVE — After Dark",
    template: "%s — NOCTIVE",
  },
  description: "NOCTIVE — apparel, events and visual culture. Drop 001: After Dark.",
  openGraph: {
    title: "NOCTIVE — After Dark",
    description: "Drop 001 / After Dark. Apparel, events and visual culture from Noctive.",
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
