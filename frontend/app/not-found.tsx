import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#12030A",
        color: "#f1ece9",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        gap: "12px",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <span style={{ fontSize: "13px", color: "#C9A227", fontWeight: 500, letterSpacing: "0.08em" }}>
        404
      </span>
      <h1 style={{ fontSize: "28px", fontWeight: 500, margin: 0 }}>Page not found</h1>
      <p style={{ color: "#7c6e6a", fontSize: "15px", margin: 0 }}>
        This page does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "8px",
          color: "#C9A227",
          fontSize: "14px",
          textDecoration: "none",
          borderBottom: "1px solid rgba(201,162,39,0.4)",
          paddingBottom: "2px",
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
