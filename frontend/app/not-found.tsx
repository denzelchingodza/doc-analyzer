import Link from "next/link";

const DEEP = "#12030A";
const GOLD = "#C9A227";
const MAROON = "#591030";

export default function NotFound() {
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

      {/* Subtle background glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${MAROON}44 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>

        {/* 404 number */}
        <p style={{
          fontSize: "clamp(80px, 18vw, 140px)",
          fontWeight: 700,
          color: `${GOLD}14`,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          userSelect: "none",
          fontFamily: "var(--font-playfair), Georgia, serif",
          marginBottom: 0,
        }}>
          404
        </p>

        {/* Gold label */}
        <p style={{
          fontSize: "10px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: GOLD,
          opacity: 0.7,
          marginTop: "-8px",
          marginBottom: "28px",
        }}>
          Page not found
        </p>

        <h1 style={{
          fontSize: "clamp(18px, 3vw, 24px)",
          fontWeight: 500,
          color: "#f1ece9",
          letterSpacing: "-0.01em",
          marginBottom: "10px",
        }}>
          Nothing here.
        </h1>

        <p style={{
          fontSize: "14px",
          color: "rgba(241,236,233,0.35)",
          maxWidth: "320px",
          lineHeight: 1.7,
          marginBottom: "36px",
        }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link href="/" style={{
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
          transition: "border-color 0.2s, color 0.2s",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
}
