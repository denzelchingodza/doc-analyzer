"use client";

import Link from "next/link";

const M = "#7B1624";
const DARK = "#2A0810";
const CREAM = "#FAF6F4";
const BORDER = "#E2CBCD";
const MUTED = "#A07880";
const LIGHT = "#F5ECEE";

function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill={M} />
      <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
      <path d="M18 8v5h5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="19" x2="20" y2="19" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="22" x2="16" y2="22" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: CREAM, minHeight: "100vh", color: DARK }}>

      {/* Nav */}
      <nav className="nav-bar" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 48px", background: CREAM,
        borderBottom: `1px solid ${BORDER}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Logo size={26} />
          <span style={{ fontSize: "17px", fontWeight: 600, color: DARK, letterSpacing: "-0.2px" }}>
            Chunk<span style={{ color: M }}>Doc</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontSize: "12px", color: MUTED, letterSpacing: "0.02em" }}>Tygerberg Medical Campus</span>
          <Link href="/app" style={{
            background: M, color: "#fff", padding: "8px 18px",
            borderRadius: "6px", fontSize: "13px", fontWeight: 500,
            textDecoration: "none",
          }}>
            Open app
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section" style={{ maxWidth: "700px", margin: "0 auto", padding: "80px 32px 64px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: LIGHT, border: `1px solid ${BORDER}`,
          borderRadius: "20px", padding: "4px 14px", marginBottom: "28px",
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: M }} />
          <span style={{ fontSize: "11px", color: M, fontWeight: 500, letterSpacing: "0.05em" }}>
            Stellenbosch University · Tygerberg Campus
          </span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(34px, 5vw, 54px)",
          fontWeight: 700,
          color: DARK,
          lineHeight: 1.2,
          marginBottom: "18px",
          letterSpacing: "-0.8px",
        }}>
          Stop scrolling through<br />
          <span style={{ color: M }}>hundreds of pages.</span>
        </h1>

        <p style={{ fontSize: "16px", color: "#6B3A3F", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto 32px" }}>
          Upload your lecture notes, clinical guidelines, or textbooks.
          Ask a question. Get the answer with the exact page it came from.
        </p>

        <div className="cta-btns" style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Link href="/app" style={{
            background: M, color: "#fff",
            padding: "11px 28px", borderRadius: "7px",
            fontSize: "14px", fontWeight: 500, textDecoration: "none",
          }}>
            Upload a document
          </Link>
          <a href="#how" style={{
            background: "transparent", color: DARK,
            padding: "11px 22px", borderRadius: "7px",
            fontSize: "14px", textDecoration: "none",
            border: `1px solid ${BORDER}`,
          }}>
            See how it works
          </a>
        </div>

        <p style={{ fontSize: "12px", color: MUTED, marginTop: "18px" }}>
          PDF and DOCX · Up to 50 MB · Page-level citations on every answer
        </p>
      </section>

      {/* Steps */}
      <section id="how" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, background: "#F3ECEE" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "52px 32px" }}>
          <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: "40px", textAlign: "center", fontWeight: 600 }}>
            Three steps
          </p>
          <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[
              {
                n: "1",
                title: "Upload your document",
                body: "Drop in any PDF or DOCX up to 50 MB. Lecture notes, a clinical guideline, a textbook chapter, a past paper."
              },
              {
                n: "2",
                title: "Ask your question",
                body: "Type in plain language. \"What is the management of hypertensive crisis?\" ChunkDoc searches your document, not the internet."
              },
              {
                n: "3",
                title: "Get a sourced answer",
                body: "You get a direct answer with the page number it came from. Verify it in seconds."
              },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "0 32px 0 0",
                marginRight: i < 2 ? "32px" : 0,
                borderRight: i < 2 ? `1px solid ${BORDER}` : "none",
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: M, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", fontWeight: 700, marginBottom: "14px",
                }}>
                  {s.n}
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: DARK, marginBottom: "8px" }}>{s.title}</p>
                <p style={{ fontSize: "13px", color: "#6B3A3F", lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "64px 32px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: MUTED, marginBottom: "32px", textAlign: "center", fontWeight: 600 }}>
          What students use it for
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {[
            {
              title: "Clinical guidelines",
              body: "Find the dosing protocol or management step you need without reading the whole guideline.",
              icon: (
                <svg width="20" height="20" fill="none" stroke={M} strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                </svg>
              ),
            },
            {
              title: "Lecture notes",
              body: "Revise faster by asking your own slides questions rather than re-reading them from the top.",
              icon: (
                <svg width="20" height="20" fill="none" stroke={M} strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
              ),
            },
            {
              title: "Medical textbooks",
              body: "Ask a chapter of Harrison's or Gray's a direct question instead of scanning 60 pages for one answer.",
              icon: (
                <svg width="20" height="20" fill="none" stroke={M} strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              ),
            },
            {
              title: "Research papers",
              body: "Extract findings, methodology, and conclusions from dense academic papers in a few seconds.",
              icon: (
                <svg width="20" height="20" fill="none" stroke={M} strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              ),
            },
          ].map((c, i) => (
            <div key={i} style={{
              background: "#fff", border: `1px solid ${BORDER}`,
              borderRadius: "10px", padding: "20px 22px",
              display: "flex", flexDirection: "column", gap: "10px",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: "9px",
                background: LIGHT, display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {c.icon}
              </div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: DARK }}>{c.title}</p>
              <p style={{ fontSize: "13px", color: "#6B3A3F", lineHeight: 1.65 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section style={{ background: M, padding: "48px 32px", textAlign: "center" }}>
        <h2 style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "28px", fontWeight: 700, color: "#fff",
          marginBottom: "10px", letterSpacing: "-0.4px",
        }}>
          Ready to try it?
        </h2>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.65)", marginBottom: "24px" }}>
          Upload any document and ask your first question in under a minute.
        </p>
        <Link href="/app" style={{
          background: "#fff", color: M,
          padding: "11px 28px", borderRadius: "7px",
          fontSize: "14px", fontWeight: 600, textDecoration: "none",
          display: "inline-block",
        }}>
          Get started
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: "#F3ECEE", borderTop: `1px solid ${BORDER}`, padding: "32px 48px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px", paddingBottom: "28px", borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Logo size={22} />
              <span style={{ fontSize: "16px", fontWeight: 600, color: DARK }}>
                Chunk<span style={{ color: M }}>Doc</span>
              </span>
            </div>
            <p style={{ fontSize: "11px", color: MUTED, marginBottom: "8px" }}>Stellenbosch University · Tygerberg Medical Campus</p>
            <p style={{ fontSize: "13px", color: "#6B3A3F", lineHeight: 1.65, maxWidth: "200px" }}>
              Document Q&A built for medical students.
            </p>
          </div>

          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "14px", fontWeight: 600 }}>Project</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="https://github.com/denz-os/doc-analyzer" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "13px", color: "#7B3840", textDecoration: "none" }}>GitHub repository</a>
              <a href="https://doc-analyzer-as5k.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "13px", color: "#7B3840", textDecoration: "none" }}>Live app</a>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: MUTED, marginBottom: "14px", fontWeight: 600 }}>Builder</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a href="https://denz-platform.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "13px", color: "#7B3840", textDecoration: "none" }}>Denzel Chingodza</a>
              <a href="https://linkedin.com/in/denzel-chingodza-45b6ab3a0/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: "13px", color: "#7B3840", textDecoration: "none" }}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "16px", flexWrap: "wrap", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: MUTED }}>Built by <a href="https://denz-platform.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#7B3840", textDecoration: "none" }}>Denzel Chingodza</a> · 2026</span>
          <span style={{ fontSize: "11px", color: "#C8A0A5", letterSpacing: "0.04em" }}>FastAPI · pgvector · OpenAI · Next.js</span>
        </div>
      </footer>

    </div>
  );
}
