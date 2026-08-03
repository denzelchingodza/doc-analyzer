"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: "#FAFAF8", minHeight: "100vh", color: "#1A0608" }}>

      {/* Nav */}
      <nav className="nav-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 48px", borderBottom: "1px solid var(--m-border)", background: "#FAFAF8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="7" fill="var(--m-primary)" />
            <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            <path d="M18 8v5h5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="19" x2="20" y2="19" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="22" x2="17" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div>
            <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", color: "var(--m-dark)", letterSpacing: "-0.3px" }}>
              Docu<span style={{ color: "var(--m-primary)" }}>Zen</span>
            </span>
            <span style={{ fontSize: "10px", color: "#B08A8E", marginLeft: "8px", letterSpacing: "0.04em" }}>Stellenbosch University</span>
          </div>
        </div>
        <Link href="/app" style={{
          background: "var(--m-primary)", color: "#fff", padding: "9px 20px",
          borderRadius: "6px", fontSize: "13px", fontWeight: 500,
          textDecoration: "none", letterSpacing: "0.01em",
        }}>
          Open App
        </Link>
      </nav>

      {/* Hero */}
      <section className="hero-section" style={{ maxWidth: "760px", margin: "0 auto", padding: "88px 48px 64px", textAlign: "center" }}>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--m-light)", border: "1px solid var(--m-border)", borderRadius: "20px", padding: "5px 14px", marginBottom: "28px" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--m-primary)" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" />
            <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: "11px", color: "var(--m-primary)", fontWeight: 500, letterSpacing: "0.04em" }}>
            Built for Tygerberg Medical Campus
          </span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(36px, 5.5vw, 58px)",
          fontWeight: 700,
          color: "var(--m-dark)",
          lineHeight: 1.18,
          marginBottom: "20px",
          letterSpacing: "-1px",
        }}>
          Your study material.<br />
          <em style={{ fontStyle: "italic", color: "var(--m-primary)" }}>Answered instantly.</em>
        </h1>

        <p style={{ fontSize: "16px", color: "#6B3A3F", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 36px" }}>
          Upload your lecture notes, clinical guidelines, or textbooks up to 50MB.
          Ask any question in plain English and get a direct answer with the exact page number it came from.
        </p>

        <div className="cta-btns" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/app" style={{
            background: "var(--m-primary)", color: "#fff",
            padding: "12px 32px", borderRadius: "6px",
            fontSize: "15px", fontWeight: 500, textDecoration: "none",
            letterSpacing: "0.01em",
          }}>
            Upload a document
          </Link>
          <a href="#how" style={{
            background: "transparent", color: "var(--m-dark)",
            padding: "12px 24px", borderRadius: "6px",
            fontSize: "15px", fontWeight: 400, textDecoration: "none",
            border: "1px solid var(--m-border)",
          }}>
            How it works
          </a>
        </div>

        <p style={{ fontSize: "12px", color: "#B08A8E", marginTop: "20px" }}>
          PDF and DOCX supported · Max 50MB · Page-level citations on every answer
        </p>
      </section>

      {/* How it works */}
      <section id="how" style={{ background: "#F3ECEE", borderTop: "1px solid var(--m-border)", borderBottom: "1px solid var(--m-border)", padding: "56px 48px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#B08A8E", marginBottom: "36px", textAlign: "center", fontWeight: 500 }}>How it works</p>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0" }}>
            {[
              { n: "01", title: "Upload your document", body: "Drop in your PDF or DOCX — lecture notes, a clinical guideline, a research paper, a textbook chapter. Up to 50MB." },
              { n: "02", title: "Ask a question", body: "Type your question in plain English. \"What is the first-line treatment for septic shock?\" The AI searches the document, not the internet." },
              { n: "03", title: "Get a sourced answer", body: "You get a direct answer and the exact page numbers it came from. Verify it yourself in under five seconds." },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "28px 32px",
                borderRight: i < 2 ? "1px solid var(--m-border)" : "none",
              }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--m-primary)", letterSpacing: "0.08em", display: "block", marginBottom: "12px" }}>{s.n}</span>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--m-dark)", marginBottom: "8px" }}>{s.title}</p>
                <p style={{ fontSize: "13px", color: "#6B3A3F", lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 48px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase", color: "#B08A8E", marginBottom: "32px", textAlign: "center", fontWeight: 500 }}>What students use it for</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { icon: "📋", title: "Clinical guidelines", body: "Find the exact dosing protocol or management step without reading the whole document." },
            { icon: "📖", title: "Textbooks", body: "Ask a chapter of Gray's Anatomy or Harrison's a direct question instead of scanning 40 pages." },
            { icon: "📄", title: "Lecture notes", body: "Revise faster by asking your own slides questions rather than re-reading them line by line." },
            { icon: "🔬", title: "Research papers", body: "Extract findings, methods, and conclusions from dense papers in seconds." },
          ].map((c, i) => (
            <div key={i} style={{
              background: "#fff", border: "1px solid var(--m-border)", borderRadius: "10px",
              padding: "20px 22px",
            }}>
              <span style={{ fontSize: "22px", marginBottom: "10px", display: "block" }}>{c.icon}</span>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--m-dark)", marginBottom: "6px" }}>{c.title}</p>
              <p style={{ fontSize: "13px", color: "#6B3A3F", lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ background: "var(--m-primary)", padding: "52px 48px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "30px", fontWeight: 700, color: "#fff", marginBottom: "12px", letterSpacing: "-0.5px" }}>
          Stop scrolling. Start asking.
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.72)", marginBottom: "28px", maxWidth: "420px", margin: "0 auto 28px" }}>
          Built for students who have too much to read and not enough time to read it.
        </p>
        <Link href="/app" style={{
          background: "#fff", color: "var(--m-primary)",
          padding: "12px 32px", borderRadius: "6px",
          fontSize: "15px", fontWeight: 600, textDecoration: "none",
          display: "inline-block",
        }}>
          Open DocuZen
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: "#F3ECEE", borderTop: "1px solid var(--m-border)", padding: "40px 48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px", paddingBottom: "32px", borderBottom: "1px solid var(--m-border)" }}>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="7" fill="var(--m-primary)" />
                <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                <path d="M18 8v5h5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="12" y1="19" x2="20" y2="19" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="12" y1="22" x2="17" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "17px", color: "var(--m-dark)" }}>
                Docu<span style={{ color: "var(--m-primary)" }}>Zen</span>
              </span>
            </div>
            <p style={{ fontSize: "11px", color: "#B08A8E", lineHeight: 1.5 }}>Stellenbosch University · Tygerberg Medical Campus</p>
            <p style={{ fontSize: "13px", color: "#6B3A3F", lineHeight: 1.65, maxWidth: "220px", marginTop: "10px" }}>
              AI document Q&amp;A built for medical students. Upload, ask, get sourced answers.
            </p>
          </div>

          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#B08A8E", marginBottom: "14px", fontWeight: 500 }}>Project</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "https://github.com/denz-os/doc-analyzer", label: "GitHub repository", icon: "github" },
                { href: "https://doc-analyzer-as5k.vercel.app", label: "Live app", icon: "external" },
              ].map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#7B3840", textDecoration: "none" }}>
                  {l.icon === "github" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B08A8E" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B08A8E" strokeWidth="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  )}
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#B08A8E", marginBottom: "14px", fontWeight: 500 }}>Builder</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: "https://github.com/denzelchingodza", label: "github.com/denzelchingodza", icon: "github" },
                { href: "https://www.linkedin.com/in/denzel-chingodza-45b6ab3a0/", label: "Denzel Chingodza", icon: "linkedin" },
                { href: "https://denz-platform.vercel.app", label: "denz-platform.vercel.app", icon: "portfolio" },
              ].map(l => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#7B3840", textDecoration: "none" }}>
                  {l.icon === "github" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B08A8E" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>}
                  {l.icon === "linkedin" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B08A8E" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
                  {l.icon === "portfolio" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B08A8E" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>}
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "18px", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: "#B08A8E" }}>
            Built by{" "}
            <a href="https://denz-platform.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#7B3840", textDecoration: "none" }}>
              Denzel Chingodza
            </a>{" "}
            · 2026
          </span>
          <span style={{ fontSize: "11px", color: "#C8A0A5", letterSpacing: "0.04em" }}>FastAPI · pgvector · OpenAI · Next.js</span>
        </div>
      </footer>

    </div>
  );
}
