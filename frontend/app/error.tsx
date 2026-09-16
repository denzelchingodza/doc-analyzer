"use client";

import { useEffect } from "react";

const DEEP = "#12030A";
const GOLD = "#C9A227";
const MAROON = "#591030";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      minHeight: "100vh",
      background: DEEP,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "2rem",
      fontFamily: "var(--font-inter), system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${MAROON}44 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div style={{ marginBottom: "24px", opacity: 0.4 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <p style={{
          fontSize: "10px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: GOLD,
          opacity: 0.7,
          marginBottom: "20px",
        }}>
          Something went wrong
        </p>

        <h1 style={{
          fontSize: "clamp(18px, 3vw, 24px)",
          fontWeight: 500,
          color: "#f1ece9",
          letterSpacing: "-0.01em",
          marginBottom: "10px",
        }}>
          An unexpected error occurred.
        </h1>

        <p style={{
          fontSize: "14px",
          color: "rgba(241,236,233,0.35)",
          maxWidth: "340px",
          lineHeight: 1.7,
          marginBottom: "36px",
        }}>
          Something didn&apos;t load correctly. Try refreshing — if it keeps happening, the service may be temporarily unavailable.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#12030A",
              background: GOLD,
              border: "none",
              padding: "10px 24px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Try again
          </button>
          <a href="/" style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: GOLD,
            textDecoration: "none",
            border: `1px solid ${GOLD}44`,
            padding: "10px 24px",
          }}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
