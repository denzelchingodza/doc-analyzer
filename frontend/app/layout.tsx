import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500"],
});

const SITE_URL = "https://doc-analyzer-as5k.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s — ChunkDoc",
    default: "ChunkDoc — AI document analysis for medical students",
  },
  description: "Upload your medical documents and ask them questions. Built for students at Stellenbosch University Tygerberg campus.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ChunkDoc — AI document analysis for medical students",
    description: "Upload your medical documents and ask them questions. Built for students at Stellenbosch University Tygerberg campus.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ChunkDoc" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChunkDoc — AI document analysis for medical students",
    description: "Upload your medical documents and ask them questions.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ background: "#12030A", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
