"use client";

import Link from "next/link";

const NAV         = "#3A0D16";
const HERO        = "#611828";
const DEEP        = "#190508";
const GOLD        = "#C9A227";
const BORDER_GOLD = "rgba(201,162,39,0.18)";
const BORDER_W    = "rgba(255,255,255,0.08)";
const WHITE_DIM   = "rgba(255,255,255,0.65)";
const WHITE_FAINT = "rgba(255,255,255,0.35)";

function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill={GOLD} />
      <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        fill="rgba(58,13,22,0.15)" stroke={NAV} strokeWidth="1.5" />
      <path d="M18 8v5h5" stroke={NAV} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="20" y2="16" stroke={NAV} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="19" x2="20" y2="19" stroke={NAV} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="22" x2="16" y2="22" stroke="rgba(58,13,22,0.45)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, 'Helvetica Neue', sans-serif", background: DEEP, minHeight: "100vh", color: "#fff" }}>

      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px", height: "56px", background: NAV,
        borderBottom: `1px solid ${BORDER_GOLD}`,
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <Logo size={24} />
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>
            Chunk<span style={{ color: GOLD }}>Doc</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <a href="#how" style={{ color: WHITE_DIM, fontSize: "13px", textDecoration: "none" }}>How it works</a>
          <Link href="/app" style={{
            background: GOLD, color: "#2C0A10",
            padding: "7px 16px", borderRadius: "6px",
            fontSize: "13px", fontWeight: 700, textDecoration: "none",
          }}>
            Open app
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background: HERO, padding: "68px 40px 76px", textAlign: "center" }}>
        <p style={{ color: GOLD, fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "26px" }}>
          Tygerberg Medical
        </p>
        <h1 style={{
          color: "#fff", fontSize: "clamp(34px, 5vw, 48px)", fontWeight: 800,
          lineHeight: 1.06, letterSpacing: "-1.5px", marginBottom: "20px",
        }}>
          Stop scrolling through<br />hundreds of pages.
        </h1>
        <p style={{ color: WHITE_DIM, fontSize: "16px", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 36px" }}>
          Upload your lecture notes, clinical guidelines, or research papers.
          Ask a question. Get the answer with the page number it came from.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "14px" }}>
          <Link href="/app" style={{
            background: GOLD, color: "#2C0A10",
            padding: "12px 26px", borderRadius: "7px",
            fontSize: "14px", fontWeight: 700, textDecoration: "none",
          }}>
            Upload a document
          </Link>
          <a href="#how" style={{
            background: "transparent", color: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(255,255,255,0.25)",
            padding: "12px 26px", borderRadius: "7px",
            fontSize: "14px", textDecoration: "none",
          }}>
            See how it works
          </a>
        </div>
        <p style={{ color: WHITE_FAINT, fontSize: "11px", letterSpacing: "0.02em", margin: 0 }}>
          PDF and DOCX supported · Max 50 MB · Page-level citations on every answer
        </p>

        {/* Preview card */}
        <div style={{
          margin: "48px auto 0", maxWidth: "480px",
          background: "rgba(0,0,0,0.22)", border: `1px solid ${BORDER_W}`,
          borderRadius: "12px", padding: "18px", textAlign: "left",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBottom: "14px", borderBottom: `1px solid ${BORDER_W}`, marginBottom: "14px" }}>
            <div style={{ width: 32, height: 32, background: "rgba(201,162,39,0.14)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="15" height="15" fill="none" stroke={GOLD} strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: "12px", fontWeight: 500, margin: 0 }}>Harrisons_Principles_Ch47.pdf</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "10px", margin: "2px 0 0" }}>Ready · 4.2 MB</p>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>Your question</p>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "12px", margin: "0 0 12px", lineHeight: 1.5, fontStyle: "italic" }}>
            {`"What is the first-line treatment for septic shock?"`}
          </p>
          <div style={{ background: "rgba(201,162,39,0.07)", border: `1px solid ${BORDER_GOLD}`, borderRadius: "8px", padding: "11px 12px" }}>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "11.5px", lineHeight: 1.6, margin: "0 0 8px" }}>
              Early goal-directed therapy includes fluid resuscitation with 30 mL/kg crystalloid within 3 hours, vasopressors to maintain MAP ≥65 mmHg...
            </p>
            <span style={{ background: "rgba(201,162,39,0.18)", color: GOLD, fontSize: "10px", padding: "3px 8px", borderRadius: "20px", fontWeight: 700 }}>
              Page 1247
            </span>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="how" style={{ background: "#fff", padding: "64px 40px" }}>
        <p style={{ color: HERO, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 10px", textAlign: "center" }}>
          Simple by design
        </p>
        <h2 style={{ color: "#180509", fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px", margin: "0 0 44px", textAlign: "center", lineHeight: 1.15 }}>
          Three steps. Seconds, not minutes.
        </h2>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "28px", maxWidth: "860px", margin: "0 auto" }}>
          {[
            { n: "1", title: "Upload your document", body: "Drop in any PDF or DOCX up to 50 MB. Lecture notes, a clinical guideline, a textbook chapter, a past paper." },
            { n: "2", title: "Ask in plain English", body: "Ask anything in plain language. ChunkDoc searches your document, not the internet." },
            { n: "3", title: "Get grounded answers", body: "Every answer includes the exact page number it came from. Verify it yourself in seconds. No hallucinations from a general model." },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ width: 38, height: 38, background: HERO, borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "15px" }}>{s.n}</span>
              </div>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#180509", margin: "0 0 7px", letterSpacing: "-0.2px" }}>{s.title}</p>
              <p style={{ fontSize: "13px", color: "#6B3A42", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use case tags */}
      <section style={{ background: "#F5ECEE", padding: "44px 40px", borderTop: "1px solid #E8D5D8", borderBottom: "1px solid #E8D5D8", textAlign: "center" }}>
        <p style={{ color: HERO, fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 18px" }}>
          What students use it for
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {["Clinical guidelines", "Lecture notes", "Harrison's Principles", "Research papers", "Past exam documents", "Pharmacy formularies"].map((tag) => (
            <span key={tag} style={{ background: "#fff", border: "1px solid #E0CBCD", color: "#3A0D16", fontSize: "12px", padding: "7px 14px", borderRadius: "5px", fontWeight: 500 }}>
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ background: NAV, padding: "56px 40px", textAlign: "center" }}>
        <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.4px", lineHeight: 1.2 }}>
          Your notes. Your questions. Your answers.
        </h2>
        <p style={{ color: WHITE_DIM, fontSize: "14px", margin: "0 0 28px" }}>
          Built by a student who spent 45 minutes looking for one clinical criterion in a 200-page PDF.
        </p>
        <Link href="/app" style={{
          background: GOLD, color: "#2C0A10",
          padding: "12px 26px", borderRadius: "7px",
          fontSize: "14px", fontWeight: 700, textDecoration: "none", display: "inline-block",
        }}>
          Get started
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: DEEP, borderTop: `1px solid ${BORDER_W}`, padding: "36px 48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px", paddingBottom: "28px", borderBottom: `1px solid ${BORDER_W}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <Logo size={22} />
              <span style={{ fontSize: "15px", fontWeight: 800, color: "#fff" }}>
                Chunk<span style={{ color: GOLD }}>Doc</span>
              </span>
            </div>
            <p style={{ fontSize: "13px", color: WHITE_DIM, lineHeight: 1.65, maxWidth: "200px" }}>
              Document Q&amp;A built for medical students.
            </p>
          </div>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "14px", fontWeight: 600 }}>Project</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="https://github.com/denz-os/doc-analyzer" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "13px", color: WHITE_DIM, textDecoration: "none" }}>GitHub repository</a>
              <a href="https://doc-analyzer-as5k.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "13px", color: WHITE_DIM, textDecoration: "none" }}>Live app</a>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "14px", fontWeight: 600 }}>Builder</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="https://denz-platform.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "13px", color: WHITE_DIM, textDecoration: "none" }}>Denzel Chingodza</a>
              <a href="https://linkedin.com/in/denzel-chingodza-45b6ab3a0/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "13px", color: WHITE_DIM, textDecoration: "none" }}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: WHITE_FAINT }}>
            Built by{" "}
            <a href="https://denz-platform.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{ color: WHITE_DIM, textDecoration: "none" }}>Denzel Chingodza</a>{" "}
            · 2026
          </span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>FastAPI · pgvector · OpenAI · Next.js</span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
