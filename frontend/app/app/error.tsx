"use client";

import { useEffect } from "react";

const GOLD = "#C9A227";
const HERO = "#591030";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
  const isBackend = error.message?.toLowerCase().includes("fetch") ||
                    error.message?.toLowerCase().includes("network") ||
                    error.message?.toLowerCase().includes("api");

  const title = isOffline
    ? "You're offline."
    : isBackend
    ? "Service unavailable."
    : "Something went wrong.";

  const body = isOffline
    ? "Check your connection and try again."
    : isBackend
    ? "The analysis service is temporarily down. Your documents are safe — try again shortly."
    : "An unexpected error occurred. Refreshing usually fixes it.";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100%",
      padding: "2rem",
      textAlign: "center",
      background: "rgba(0,0,0,0.4)",
      fontFamily: "var(--font-inter), system-ui, sans-serif",
    }}>
      <div style={{
        background: "rgba(18,3,10,0.9)",
        border: "1px solid rgba(201,162,39,0.2)",
        padding: "48px 40px",
        maxWidth: "400px",
        width: "100%",
      }}>
        <div style={{ marginBottom: "20px", opacity: 0.5 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5">
            {isOffline ? (
              <>
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>
              </>
            ) : (
              <>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </>
            )}
          </svg>
        </div>

        <p style={{
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: GOLD,
          opacity: 0.6,
          marginBottom: "14px",
        }}>
          {isOffline ? "No connection" : "Service error"}
        </p>

        <h2 style={{ fontSize: "20px", fontWeight: 500, color: "#f1ece9", marginBottom: "10px" }}>
          {title}
        </h2>

        <p style={{
          fontSize: "13px",
          color: "rgba(241,236,233,0.4)",
          lineHeight: 1.7,
          marginBottom: "28px",
        }}>
          {body}
        </p>

        <button
          onClick={reset}
          style={{
            width: "100%",
            padding: "11px",
            background: GOLD,
            border: "none",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#12030A",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
