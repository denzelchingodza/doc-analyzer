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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!PASSWORD || input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f1117",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        background: "#1a1d27",
        border: "1px solid #2a2d3a",
        borderRadius: "12px",
        padding: "40px 48px",
        width: "100%",
        maxWidth: "380px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔒</div>
        <h1 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: "0 0 6px" }}>
          DocuZen
        </h1>
        <p style={{ color: "#8b8fa8", fontSize: "14px", margin: "0 0 28px" }}>
          Enter the password to continue
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "8px",
              border: error ? "1px solid #e55" : "1px solid #2a2d3a",
              background: "#0f1117",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "12px",
            }}
          />
          {error && (
            <p style={{ color: "#e55", fontSize: "13px", margin: "0 0 12px" }}>
              Incorrect password
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#4A5C2F",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
