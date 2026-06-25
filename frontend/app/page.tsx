"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: "#F2F4EE", minHeight: "100vh", color: "#1A2410" }}>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", borderBottom: "1px solid #D6DCCA", background: "#F2F4EE" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="7" fill="#4A5C2F" />
            <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            <path d="M18 8v5h5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="19" x2="20" y2="19" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="22" x2="17" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "19px", color: "#2E3A1C", letterSpacing: "-0.3px" }}>
            Docu<span style={{ color: "#4A5C2F" }}>Zen</span>
          </span>
        </div>
        <Link href="/app" style={{
          background: "#4A5C2F", color: "#fff", padding: "9px 20px",
          borderRadius: "6px", fontSize: "13px", fontWeight: 500,
          textDecoration: "none", letterSpacing: "0.01em",
        }}>
          Open App →
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "96px 48px 72px", textAlign: "center" }}>
        <p style={{ fontSize: "12px", color: "#7A8E6A", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, marginBottom: "24px" }}>
          AI document intelligence
        </p>

        <h1 style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(38px, 5.5vw, 62px)",
          fontWeight: 700,
          color: "#2E3A1C",
          lineHeight: 1.18,
          marginBottom: "22px",
          letterSpacing: "-1px",
        }}>
          Ask questions.<br />
          <em style={{ fontStyle: "italic", color: "#4A5C2F" }}>Get answers</em> from your documents.
        </h1>

        <p style={{ fontSize: "17px", color: "#5A6E4A", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 36px" }}>
          Upload any PDF or Word document and have a real conversation with it. DocuZen finds the exact passages that matter, with page citations.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/app" style={{
            background: "#4A5C2F", color: "#fff",
            padding: "11px 28px", borderRadius: "6px",
            fontSize: "15px", fontWeight: 500, textDecoration: "none",
          }}>
            Open DocuZen →
          </Link>
          <a href="#how-it-works" style={{
            background: "transparent", color: "#4A5C2F",
            padding: "11px 28px", borderRadius: "6px",
            fontSize: "15px", fontWeight: 500, textDecoration: "none",
            border: "1px solid #C8D4B8",
          }}>
            How it works
          </a>
        </div>

        <p style={{ marginTop: "18px", fontSize: "12px", color: "#9AAA8A" }}>
          Password protected — <span style={{ fontFamily: "monospace", color: "#5A6E4A" }}>docuzen2026</span>
        </p>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ borderTop: "1px solid #D6DCCA" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {[
            {
              step: "01",
              title: "Upload your document",
              body: "PDF or DOCX up to 50MB. Parsed and indexed in seconds using real embeddings.",
            },
            {
              step: "02",
              title: "Ask anything",
              body: "Plain language. No syntax or commands. DocuZen retrieves the right chunks and synthesises an answer.",
            },
            {
              step: "03",
              title: "Get sourced answers",
              body: "Every answer includes the exact page it came from so you can verify instantly.",
            },
          ].map((item, i) => (
            <div key={item.step} style={{
              padding: "40px 48px",
              borderRight: i < 2 ? "1px solid #D6DCCA" : "none",
              background: "#fff",
            }}>
              <p style={{ fontSize: "11px", color: "#B0BFA0", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "14px" }}>
                {item.step}
              </p>
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#2E3A1C", marginBottom: "10px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#6A7E5A", lineHeight: 1.7 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#fff", borderTop: "1px solid #D6DCCA", padding: "22px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="7" fill="#4A5C2F" />
            <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            <path d="M18 8v5h5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="19" x2="20" y2="19" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="22" x2="17" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "16px", color: "#2E3A1C" }}>
            Docu<span style={{ color: "#4A5C2F" }}>Zen</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <a href="https://github.com/denz-os/doc-analyzer" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "13px", color: "#9AAA8A", textDecoration: "none" }}>
            GitHub
          </a>
          <a href="https://denzos-platform.vercel.app" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "13px", color: "#9AAA8A", textDecoration: "none" }}>
            DenzOS
          </a>
          <a href="mailto:denzel.chingodza@icloud.com"
            style={{ fontSize: "13px", color: "#9AAA8A", textDecoration: "none" }}>
            Contact
          </a>
        </div>

        <span style={{ fontSize: "12px", color: "#B0BFA0" }}>Built by Denzel Chingodza</span>
      </footer>

    </div>
  );
}
