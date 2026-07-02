"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: "#F5EFE4", minHeight: "100vh", color: "#1A2410" }}>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", borderBottom: "1px solid #DDD6C8", background: "#F5EFE4" }}>
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
          Open App
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "96px 48px 72px", textAlign: "center" }}>

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

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/app" style={{
            background: "#4A5C2F", color: "#fff",
            padding: "11px 28px", borderRadius: "6px",
            fontSize: "15px", fontWeight: 500, textDecoration: "none",
          }}>
            Open DocuZen
          </Link>
          <a href="#about" style={{
            background: "transparent", color: "#4A5C2F",
            padding: "11px 28px", borderRadius: "6px",
            fontSize: "15px", fontWeight: 500, textDecoration: "none",
            border: "1px solid #C8D4B8",
          }}>
            How it works
          </a>
        </div>

      </section>

      {/* Steps */}
      <section id="about" style={{ borderTop: "1px solid #DDD6C8", background: "#EDE6D8", padding: "48px 64px 52px" }}>
        {[
          { n: "01", title: "Upload your document", body: "PDF or Word file, up to 50MB. It gets read and indexed in the background." },
          { n: "02", title: "Ask anything",          body: "Type your question in plain English. No commands, no syntax." },
          { n: "03", title: "Get a sourced answer",  body: "Every answer includes the page it came from so you can verify it yourself." },
        ].map((s) => (
          <div key={s.n} style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "32px" }}>
            <span style={{ fontSize: "12px", color: "#B0BFA0", fontWeight: 500, minWidth: "24px", paddingTop: "2px" }}>{s.n}</span>
            <div>
              <strong style={{ fontSize: "15px", fontWeight: 500, color: "#2E3A1C", display: "block", marginBottom: "4px" }}>{s.title}</strong>
              <p style={{ fontSize: "14px", color: "#6A7A5A", lineHeight: 1.7, margin: 0 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ background: "#EDE6D8", borderTop: "1px solid #DDD6C8", padding: "40px 48px 24px" }}>

        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px", paddingBottom: "32px", borderBottom: "1px solid #DDD6C8" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <p style={{ fontSize: "13px", color: "#7A8A6A", lineHeight: 1.65, maxWidth: "220px" }}>
              AI-powered document Q&amp;A. Upload a PDF or Word doc, ask questions, get sourced answers.
            </p>
          </div>

          {/* Project links */}
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#B0BFA0", marginBottom: "14px", fontWeight: 500 }}>Project</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "https://github.com/denz-os/doc-analyzer", label: "github.com/denz-os/doc-analyzer", icon: "github" },
                { href: "https://doc-analyzer-as5k.vercel.app", label: "Live app", icon: "external" },
              ].map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#5A6E4A", textDecoration: "none" }}>
                  {l.icon === "github" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A9A7A" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A9A7A" strokeWidth="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  )}
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#B0BFA0", marginBottom: "14px", fontWeight: 500 }}>Connect</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "https://github.com/denzelchingodza", label: "github.com/denzelchingodza", icon: "github" },
                { href: "https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/", label: "Denzel Chingodza", icon: "linkedin" },
                { href: "https://denz-platform.vercel.app", label: "denz-platform.vercel.app", icon: "portfolio" },
              ].map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#5A6E4A", textDecoration: "none" }}>
                  {l.icon === "github" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A9A7A" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>}
                  {l.icon === "linkedin" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A9A7A" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
                  {l.icon === "portfolio" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A9A7A" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>}
                  {l.label}
                </a>
              ))}
            </div>
            <a href="https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginTop: "16px", background: "#4A5C2F", color: "#fff", fontSize: "12px", padding: "9px 18px", borderRadius: "5px", textDecoration: "none", letterSpacing: "0.02em" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "18px", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#B0BFA0" }}>
            Built by{" "}
            <a href="https://denz-platform.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#8A9A7A", textDecoration: "none" }}>
              Denzel Chingodza
            </a>{" "}
            · 2026
          </span>
          <span style={{ fontSize: "11px", color: "#C8D4B8", letterSpacing: "0.04em" }}>FastAPI · pgvector · OpenAI · Next.js</span>
        </div>

      </footer>

    </div>
  );
}
