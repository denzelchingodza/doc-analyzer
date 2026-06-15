"use client";

import { useState } from "react";

const SESSION_KEY = "docuzen_auth";
const PASSWORD = process.env.NEXT_PUBLIC_APP_PASSWORD ?? "";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(SESSION_KEY) === "1";
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!PASSWORD || input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setInput("");
      setTimeout(() => setShake(false), 500);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
        .shake { animation: shake 0.45s ease; }
        .gate-input:focus { border-color: #6b7c3f !important; outline: none; }
        .gate-btn:hover { background: #5a6e39 !important; }
      `}</style>

      {/* Blurred app behind the gate */}
      <div style={{
        position: "fixed",
        inset: 0,
        filter: "blur(12px) brightness(0.4)",
        pointerEvents: "none",
        userSelect: "none",
        transform: "scale(1.05)",
      }}>
        {children}
      </div>

      {/* Gate overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', -apple-system, sans-serif",
        zIndex: 50,
      }}>
        <div
          className={shake ? "shake" : ""}
          style={{
            background: "rgba(20, 22, 30, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "44px 48px",
            width: "100%",
            maxWidth: "380px",
            textAlign: "center",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Emoji row */}
          <div style={{ fontSize: "28px", marginBottom: "14px", letterSpacing: "6px" }}>
            📄🔐✨
          </div>

          <h1 style={{
            color: "#fff",
            fontSize: "22px",
            fontWeight: 700,
            margin: "0 0 6px",
            letterSpacing: "-0.3px",
          }}>
            DocuZen
          </h1>
          <p style={{ color: "#6b7585", fontSize: "13px", margin: "0 0 30px" }}>
            This app is password protected 🤫
          </p>

          <form onSubmit={handleSubmit}>
            <input
              className="gate-input"
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              autoFocus
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "9px",
                border: error ? "1px solid #d9534f" : "1px solid rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.35)",
                color: "#fff",
                fontSize: "15px",
                boxSizing: "border-box",
                marginBottom: error ? "8px" : "14px",
                transition: "border-color 0.2s",
              }}
            />
            {error && (
              <p style={{ color: "#d9534f", fontSize: "13px", margin: "0 0 14px" }}>
                Wrong password 🙅
              </p>
            )}
            <button
              className="gate-btn"
              type="submit"
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: "9px",
                border: "none",
                background: "#4A5C2F",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
                letterSpacing: "0.2px",
              }}
            >
              Let me in 🚀
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
