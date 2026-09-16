import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for ChunkDoc — how we handle your documents and data.",
};

const DEEP = "#12030A";
const GOLD = "#C9A227";
const MAROON = "#591030";

export default function PrivacyPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: DEEP,
      fontFamily: "var(--font-inter), system-ui, sans-serif",
      color: "#f1ece9",
    }}>

      {/* Nav */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 48px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(0,0,0,0.2)",
      }}>
        <span style={{ fontSize: "10px", letterSpacing: "0.18em", color: GOLD, opacity: 0.85, fontWeight: 600 }}>
          CHUNKDOC
        </span>
        <Link href="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          fontSize: "11px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(241,236,233,0.4)",
          textDecoration: "none",
          transition: "color 0.2s",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </Link>
      </nav>

      {/* Content */}
      <div style={{
        maxWidth: "660px",
        margin: "0 auto",
        padding: "72px 32px 120px",
      }}>
        <p style={{
          fontSize: "9px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: GOLD,
          opacity: 0.6,
          marginBottom: "16px",
        }}>
          Legal
        </p>

        <h1 style={{
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          fontFamily: "var(--font-playfair), Georgia, serif",
          marginBottom: "8px",
          color: "#f1ece9",
        }}>
          Privacy Policy
        </h1>

        <p style={{ fontSize: "12px", color: "rgba(241,236,233,0.25)", marginBottom: "56px" }}>
          Last updated: September 2026
        </p>

        <Section title="Overview">
          ChunkDoc is a tool for analysing medical documents using AI. It processes the documents you
          upload to answer your questions. We collect the minimum data necessary to make this work and
          we do not share or sell anything.
        </Section>

        <Section title="Documents you upload">
          When you upload a document, its contents are extracted, split into chunks, and stored in a
          PostgreSQL database with vector embeddings so questions can be answered against it. Only one
          document can exist at a time — deleting it removes all stored chunks and embeddings
          immediately. Documents are not shared with other users.
        </Section>

        <Section title="AI processing">
          Your questions and relevant document chunks are sent to{" "}
          <A href="https://openai.com/privacy">OpenAI&apos;s API</A> to generate answers.
          OpenAI&apos;s own data usage policies apply. As of 2026, API data is not used to train
          OpenAI models by default. No conversation history is stored on our servers — each question
          is answered from the current document context only.
        </Section>

        <Section title="Analytics">
          This site may use Vercel Analytics to collect anonymised page view data and performance
          metrics. No cookies are used. No personal identifiers are collected. Vercel&apos;s{" "}
          <A href="https://vercel.com/legal/privacy-policy">privacy policy</A> governs this.
        </Section>

        <Section title="Third-party services">
          <ul style={{ paddingLeft: "20px", lineHeight: 2, color: "rgba(241,236,233,0.4)", fontSize: "14px" }}>
            <li><strong style={{ color: "rgba(241,236,233,0.7)" }}>OpenAI</strong> — AI inference for document Q&A</li>
            <li><strong style={{ color: "rgba(241,236,233,0.7)" }}>Vercel</strong> — hosting and edge delivery</li>
            <li><strong style={{ color: "rgba(241,236,233,0.7)" }}>Google Fonts</strong> — font loading (IP exposed to Google servers)</li>
          </ul>
        </Section>

        <Section title="Medical documents">
          ChunkDoc is a student study tool. Do not upload documents containing real patient data,
          personally identifiable health information, or confidential clinical records. The service
          is not HIPAA-compliant and is not intended for clinical use.
        </Section>

        <Section title="Data retention">
          Documents and their chunks are stored only while a document exists in the system. Deletion
          is immediate and permanent. We do not retain backups of user-uploaded content.
        </Section>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", margin: "48px 0" }} />

        <Section title="Contact">
          Questions about this policy?{" "}
          <A href="mailto:denzel.chingodza@icloud.com">denzel.chingodza@icloud.com</A>
        </Section>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "20px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "11px",
        color: "rgba(241,236,233,0.2)",
      }}>
        <span>© 2026 Denzel Chingodza</span>
        <Link href="/" style={{ color: "rgba(201,162,39,0.5)", textDecoration: "none", fontSize: "11px" }}>
          ChunkDoc
        </Link>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{
        fontSize: "9px",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(241,236,233,0.35)",
        marginBottom: "12px",
        fontWeight: 600,
      }}>
        {title}
      </h2>
      <p style={{ fontSize: "14px", color: "rgba(241,236,233,0.45)", lineHeight: 1.8 }}>
        {children}
      </p>
    </div>
  );
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      color: "#C9A227",
      textDecoration: "none",
      borderBottom: "1px solid rgba(201,162,39,0.3)",
      paddingBottom: "1px",
    }}>
      {children}
    </a>
  );
}
