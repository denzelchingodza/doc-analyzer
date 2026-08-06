import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analyse documents",
  description: "Upload a PDF or document and ask questions about its contents using AI.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
