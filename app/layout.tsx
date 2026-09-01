import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.noctivepresents.com"),
  title: {
    default: "NOCTIVE — After Dark",
    template: "%s — NOCTIVE",
  },
  description: "NOCTIVE — apparel, events and studio projects. Drop 001: After Dark.",
  openGraph: {
    title: "NOCTIVE — After Dark",
    description: "Drop 001 / After Dark. Apparel, events and studio projects from Noctive.",
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
