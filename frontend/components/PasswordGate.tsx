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
        .gate-input:focus {
          border-color: #6b7c3f !important;
          outline: none;
          box-shadow: 0 0 0 3px rgba(74, 92, 47, 0.25);
        }
        .gate-btn:hover { background: #5a6e39 !important; }
      `}</style>

      {/* Blurred app behind the gate */}
      <div style={{
        position: "fixed",
        inset: 0,
        filter: "blur(12px) brightness(0.35)",
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
            background: "rgba(18, 22, 14, 0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(74, 92, 47, 0.35)",
            borderRadius: "16px",
            padding: "44px 48px",
            width: "100%",
            maxWidth: "380px",
            textAlign: "center",
            boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(74,92,47,0.1)",
          }}
        >
          {/* Logo mark */}
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #4A5C2F, #6b7c3f)",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 style={{
            color: "#e8edd8",
            fontSize: "20px",
            fontWeight: 700,
            margin: "0 0 6px",
            letterSpacing: "-0.3px",
          }}>
            DocuZen
          </h1>
          <p style={{ color: "#7a8468", fontSize: "13px", margin: "0 0 28px" }}>
            Enter your password to access the app
          </p>

          <form onSubmit={handleSubmit}>
            <input
              className="gate-input"
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: "9px",
                border: error ? "1px solid #a04040" : "1px solid rgba(74, 92, 47, 0.3)",
                background: "rgba(74, 92, 47, 0.08)",
                color: "#e8edd8",
                fontSize: "15px",
                boxSizing: "border-box",
                marginBottom: error ? "8px" : "14px",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
            />
            {error && (
              <p style={{ color: "#b05555", fontSize: "13px", margin: "0 0 14px" }}>
                Incorrect password
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
                color: "#e8edd8",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
                letterSpacing: "0.2px",
              }}
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
