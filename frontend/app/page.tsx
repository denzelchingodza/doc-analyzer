"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: "#F2F4EE", minHeight: "100vh", color: "#1A2410" }}>

      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid #D6DCCA" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#4A5C2F" />
            <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            <path d="M18 8v5h5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="19" x2="20" y2="19" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="22" x2="17" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "20px", color: "#2E3A1C", letterSpacing: "-0.3px" }}>
            Docu<span style={{ color: "#4A5C2F" }}>Zen</span>
          </span>
        </div>
        <Link href="/app" style={{
          background: "#4A5C2F", color: "#fff", padding: "10px 22px",
          borderRadius: "8px", fontSize: "14px", fontWeight: 500,
          textDecoration: "none", letterSpacing: "0.01em",
          transition: "background 0.15s",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#3a4a24")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4A5C2F")}
        >
          Open App →
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "100px 48px 80px", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: "#E8EDE0", border: "1px solid #D6DCCA",
          borderRadius: "20px", padding: "5px 14px", marginBottom: "32px",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4A5C2F", display: "inline-block" }} />
          <span style={{ fontSize: "12px", color: "#4A5C2F", fontWeight: 500 }}>AI-powered document intelligence</span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(42px, 6vw, 68px)",
          fontWeight: 700,
          color: "#2E3A1C",
          lineHeight: 1.15,
          marginBottom: "24px",
          letterSpacing: "-1px",
        }}>
          Ask questions.<br />
          <span style={{ color: "#4A5C2F" }}>Get answers</span> from your documents.
        </h1>

        <p style={{ fontSize: "18px", color: "#5A6E4A", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto 44px" }}>
          Upload any PDF or Word document and have a natural conversation with it. DocuZen finds the exact passages that matter, so you spend less time searching.
        </p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/app" style={{
            background: "#4A5C2F", color: "#fff",
            padding: "14px 32px", borderRadius: "10px",
            fontSize: "16px", fontWeight: 600, textDecoration: "none",
            boxShadow: "0 2px 12px rgba(74,92,47,0.25)",
          }}>
            Start for free →
          </Link>
          <a href="#how-it-works" style={{
            background: "transparent", color: "#4A5C2F",
            padding: "14px 32px", borderRadius: "10px",
            fontSize: "16px", fontWeight: 500, textDecoration: "none",
            border: "1.5px solid #D6DCCA",
          }}>
            How it works
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ maxWidth: "960px", margin: "0 auto", padding: "80px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "36px", fontWeight: 700, color: "#2E3A1C", marginBottom: "12px" }}>
            Three steps to clarity
          </h2>
          <p style={{ fontSize: "16px", color: "#5A6E4A" }}>No setup. No training. Just upload and ask.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {[
            {
              step: "01",
              icon: (
                <svg width="28" height="28" fill="none" stroke="#4A5C2F" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8m0 0-3 3m3-3 3 3M6.5 19a4.5 4.5 0 0 1 0-9h.5a5 5 0 0 1 9.8-1A4.5 4.5 0 0 1 17.5 19h-11Z" />
                </svg>
              ),
              title: "Upload your document",
              body: "Drag in any PDF or DOCX — research papers, contracts, reports, manuals. DocuZen processes it in seconds.",
            },
            {
              step: "02",
              icon: (
                <svg width="28" height="28" fill="none" stroke="#4A5C2F" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              ),
              title: "Ask anything",
              body: "Ask in plain language. Summaries, specific facts, comparisons, definitions — DocuZen understands what you mean.",
            },
            {
              step: "03",
              icon: (
                <svg width="28" height="28" fill="none" stroke="#4A5C2F" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              ),
              title: "Get sourced answers",
              body: "Every answer is grounded in the document, with page references so you can verify exactly where the information came from.",
            },
          ].map((item) => (
            <div key={item.step} style={{
              background: "#fff",
              border: "1px solid #D6DCCA",
              borderRadius: "16px",
              padding: "32px 28px",
              position: "relative",
            }}>
              <span style={{
                position: "absolute", top: "28px", right: "28px",
                fontSize: "11px", fontWeight: 700, color: "#D6DCCA",
                letterSpacing: "0.05em",
              }}>{item.step}</span>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#E8EDE0", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#2E3A1C", marginBottom: "10px" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "#5A6E4A", lineHeight: 1.75 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "0 48px 80px" }}>
        <div style={{
          background: "#2E3A1C",
          borderRadius: "20px",
          padding: "64px 48px",
          textAlign: "center",
        }}>
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "34px", fontWeight: 700, color: "#F2F4EE", marginBottom: "14px" }}>
            Ready to stop skimming?
          </h2>
          <p style={{ fontSize: "16px", color: "#A8B89A", marginBottom: "36px", lineHeight: 1.7 }}>
            DocuZen reads your documents so you can focus on the insights.
          </p>
          <Link href="/app" style={{
            background: "#4A5C2F", color: "#F2F4EE",
            padding: "15px 36px", borderRadius: "10px",
            fontSize: "16px", fontWeight: 600, textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "inline-block",
          }}>
            Open DocuZen →
          </Link>
        </div>
      </section>

      {/* Footer / Developer section */}
      <footer style={{ borderTop: "1px solid #D6DCCA", padding: "48px", maxWidth: "960px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#4A5C2F" />
            <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            <path d="M18 8v5h5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="19" x2="20" y2="19" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="12" y1="22" x2="17" y2="22" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", color: "#2E3A1C" }}>
            Docu<span style={{ color: "#4A5C2F" }}>Zen</span>
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Avatar initial */}
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "#2E3A1C",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "15px", fontWeight: 700, color: "#A8B89A",
            flexShrink: 0,
          }}>D</div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#2E3A1C" }}>Built by Denzel Chingodza</p>
            <p style={{ fontSize: "12px", color: "#7A8E6A", marginTop: "2px" }}>
              Full-stack developer · FastAPI, Next.js, RAG pipelines
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
