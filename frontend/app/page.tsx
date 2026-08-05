"use client";

import Link from "next/link";

const HERO = "#591030";
const GOLD = "#C9A227";
const DEEP = "#12030A";

const _patSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="36" fill="none" stroke="white" stroke-opacity="0.04" stroke-width="1"/><circle cx="0" cy="0" r="36" fill="none" stroke="white" stroke-opacity="0.04" stroke-width="1"/><circle cx="80" cy="0" r="36" fill="none" stroke="white" stroke-opacity="0.04" stroke-width="1"/><circle cx="0" cy="80" r="36" fill="none" stroke="white" stroke-opacity="0.04" stroke-width="1"/><circle cx="80" cy="80" r="36" fill="none" stroke="white" stroke-opacity="0.04" stroke-width="1"/></svg>`;
const PATTERN = `url("data:image/svg+xml,${encodeURIComponent(_patSvg)}")`;

function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="7" fill={GOLD} />
      <path d="M10 8h8l5 5v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        fill="rgba(58,13,22,0.15)" stroke="#380A1C" strokeWidth="1.5" />
      <path d="M18 8v5h5" stroke="#380A1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="16" x2="20" y2="16" stroke="#380A1C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="19" x2="20" y2="19" stroke="#380A1C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Floating medical icons
const icons = [
  // Pill / capsule
  { id: "pill", x: "8%",  y: "18%", size: 32, delay: "0s",    duration: "7s",  rotate: "20deg" },
  { id: "pill", x: "85%", y: "65%", size: 24, delay: "1.5s",  duration: "9s",  rotate: "-15deg" },
  // Medical cross
  { id: "cross", x: "78%", y: "14%", size: 28, delay: "0.5s", duration: "8s",  rotate: "0deg" },
  { id: "cross", x: "12%", y: "72%", size: 20, delay: "2s",   duration: "11s", rotate: "45deg" },
  // Heartbeat line
  { id: "ecg",  x: "60%", y: "80%", size: 48, delay: "1s",    duration: "10s", rotate: "0deg" },
  { id: "ecg",  x: "5%",  y: "45%", size: 36, delay: "3s",    duration: "8s",  rotate: "0deg" },
  // Molecule dot
  { id: "mol",  x: "88%", y: "38%", size: 30, delay: "0.8s",  duration: "12s", rotate: "0deg" },
  { id: "mol",  x: "40%", y: "88%", size: 22, delay: "2.5s",  duration: "9s",  rotate: "0deg" },
  // Stethoscope
  { id: "stet", x: "70%", y: "26%", size: 30, delay: "1.2s",  duration: "10s", rotate: "-10deg" },
  { id: "stet", x: "22%", y: "85%", size: 24, delay: "3.5s",  duration: "7s",  rotate: "10deg" },
];

function MedIcon({ id, size }: { id: string; size: number }) {
  const s = size;
  const op = "rgba(255,255,255,0.18)";
  const sw = "1.5";

  if (id === "pill") return (
    <svg width={s} height={s * 0.55} viewBox="0 0 40 22" fill="none">
      <rect x="1" y="1" width="38" height="20" rx="10" stroke={op} strokeWidth={sw} />
      <line x1="20" y1="1" x2="20" y2="21" stroke={op} strokeWidth={sw} />
      <rect x="1" y="1" width="19" height="20" rx="10" fill={op} />
    </svg>
  );

  if (id === "cross") return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="1" width="6" height="22" rx="2" fill={op} />
      <rect x="1" y="9" width="22" height="6" rx="2" fill={op} />
    </svg>
  );

  if (id === "ecg") return (
    <svg width={s * 1.8} height={s * 0.7} viewBox="0 0 80 28" fill="none">
      <polyline
        points="0,14 14,14 20,4 26,24 32,4 38,14 50,14 56,8 62,20 68,14 80,14"
        stroke={op} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );

  if (id === "mol") return (
    <svg width={s} height={s} viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="4" fill={op} />
      <circle cx="6"  cy="8"  r="2.5" fill={op} />
      <circle cx="30" cy="8"  r="2.5" fill={op} />
      <circle cx="6"  cy="28" r="2.5" fill={op} />
      <circle cx="30" cy="28" r="2.5" fill={op} />
      <line x1="18" y1="14" x2="8"  y2="9"  stroke={op} strokeWidth={sw} />
      <line x1="18" y1="14" x2="28" y2="9"  stroke={op} strokeWidth={sw} />
      <line x1="18" y1="22" x2="8"  y2="27" stroke={op} strokeWidth={sw} />
      <line x1="18" y1="22" x2="28" y2="27" stroke={op} strokeWidth={sw} />
    </svg>
  );

  if (id === "stet") return (
    <svg width={s} height={s} viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="20" r="5" stroke={op} strokeWidth={sw} />
      <path d="M9 20 Q9 8 14 8" stroke={op} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <path d="M19 20 Q19 8 14 8" stroke={op} strokeWidth={sw} strokeLinecap="round" fill="none" />
      <circle cx="10" cy="8" r="2" stroke={op} strokeWidth={sw} />
      <circle cx="18" cy="8" r="2" stroke={op} strokeWidth={sw} />
    </svg>
  );

  return null;
}

export default function LandingPage() {
  return (
    <div style={{
      fontFamily: "system-ui, -apple-system, 'Helvetica Neue', sans-serif",
      background: HERO,
      backgroundImage: PATTERN,
      minHeight: "100vh",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      position: "relative",
    }}>

      {/* Floating medical icons */}
      {icons.map((ic, i) => (
        <div key={i} style={{
          position: "absolute",
          left: ic.x,
          top:  ic.y,
          transform: `rotate(${ic.rotate})`,
          animation: `float ${ic.duration} ease-in-out ${ic.delay} infinite`,
          pointerEvents: "none",
          zIndex: 0,
        }}>
          <MedIcon id={ic.id} size={ic.size} />
        </div>
      ))}

      {/* Deep radial vignette so centre is readable */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, ${DEEP}88 100%)`,
      }} />

      {/* Nav — empty, just spacing */}
      <nav style={{ position: "relative", zIndex: 10, padding: "22px 36px", height: "68px" }} />

      {/* Hero — centred, full height */}
      <section style={{
        flex: 1,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: "0 24px 80px",
        position: "relative", zIndex: 10,
      }}>
        <p style={{
          color: GOLD, fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.18em", textTransform: "uppercase",
          marginBottom: "24px", opacity: 0.9,
        }}>
          Tygerberg Medical
        </p>

        <h1 style={{
          fontSize: "clamp(38px, 6vw, 64px)",
          fontWeight: 800, lineHeight: 1.05,
          letterSpacing: "-2px",
          margin: "0 0 20px",
          maxWidth: "680px",
        }}>
          Stop scrolling through<br />hundreds of pages.
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "15px", lineHeight: 1.7,
          maxWidth: "360px", margin: "0 0 40px",
        }}>
          Upload a medical document.<br />
          Ask anything. Get the answer with the page number.
        </p>

        <Link href="/app" style={{
          background: GOLD, color: "#2C0A10",
          padding: "13px 32px", borderRadius: "8px",
          fontSize: "14px", fontWeight: 800,
          textDecoration: "none",
          letterSpacing: "-0.2px",
          boxShadow: "0 0 32px rgba(201,162,39,0.25)",
          transition: "opacity 0.15s",
          display: "inline-block",
        }}>
          Open app
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "18px 36px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "12px",
      }}>
        {/* Left — name + year */}
        <a
          href="https://denz-platform.vercel.app"
          target="_blank" rel="noopener noreferrer"
          style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", textDecoration: "none", letterSpacing: "0.01em" }}
        >
          Denzel Chingodza · 2026
        </a>

        {/* Centre — stack tags */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {["FastAPI", "pgvector", "OpenAI", "Next.js"].map(tag => (
            <span key={tag} style={{ color: "rgba(255,255,255,0.22)", fontSize: "11px", letterSpacing: "0.03em" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Right — links */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <a
            href="https://github.com/denz-os/doc-analyzer"
            target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/denzel-chingodza-45b6ab3a0"
            target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px)   rotate(var(--r, 0deg)); }
          50%  { transform: translateY(-14px) rotate(var(--r, 0deg)); }
          100% { transform: translateY(0px)   rotate(var(--r, 0deg)); }
        }
        @media (max-width: 600px) {
          footer { justify-content: center !important; text-align: center; }
          footer > div:nth-child(2) { display: none !important; }
        }
      `}</style>
    </div>
  );
}
