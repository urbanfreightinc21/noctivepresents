import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOCTIVE — After Dark",
  description: "Noctive is a world built after dark. Wear, live experiences and special projects.",
  openGraph: {
    title: "NOCTIVE — After Dark",
    description: "Wear. Presents. Studio. The world of Noctive.",
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
