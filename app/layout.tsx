import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noctive Presents",
  description: "More than a show. This is Noctive.",
  openGraph: {
    title: "Noctive Presents",
    description: "We create the shows we want to see.",
    images: ["/noctive-poster.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
