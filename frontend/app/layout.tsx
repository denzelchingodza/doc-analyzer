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

export const metadata: Metadata = {
  title: "ChunkDoc · Tygerberg Medical Campus",
  description: "Upload your medical documents and ask them questions. Built for students at Stellenbosch University Tygerberg campus.",
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
