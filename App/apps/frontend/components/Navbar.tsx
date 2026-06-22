"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 48px",
        background: "rgba(8, 12, 20, 0.72)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(30, 45, 64, 0.6)",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="3" cy="9" r="2.5" fill="white" />
            <circle cx="9" cy="4" r="2.5" fill="white" />
            <circle cx="9" cy="14" r="2.5" fill="white" />
            <circle cx="15" cy="9" r="2.5" fill="white" />
            <line x1="5.5" y1="9" x2="6.5" y2="9" stroke="white" strokeWidth="1.5" />
            <line x1="9" y1="6.5" x2="9" y2="7.5" stroke="white" strokeWidth="1.5" />
            <line x1="9" y1="10.5" x2="9" y2="11.5" stroke="white" strokeWidth="1.5" />
            <line x1="11.5" y1="9" x2="12.5" y2="9" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "-0.3px",
            color: "#E2E8F0",
          }}
        >
          PipeFlow
        </span>
      </Link>

      {/* Links */}
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          listStyle: "none",
        }}
        className="nav-links-list"
      >
        {["Features", "How it works", "Pricing", "Docs"].map((item) => (
          <li key={item}>
            <Link
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                color: "#64748B",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#E2E8F0")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748B")}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link
          href="#"
          style={{
            color: "#64748B",
            background: "none",
            border: "none",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            padding: "8px 16px",
            borderRadius: 8,
            textDecoration: "none",
            transition: "color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "#E2E8F0";
            el.style.background = "rgba(255,255,255,0.05)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "#64748B";
            el.style.background = "none";
          }}
        >
          Log in
        </Link>
        <Link
          href="#"
          style={{
            background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
            color: "#fff",
            border: "none",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            padding: "9px 20px",
            borderRadius: 8,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.opacity = "0.88";
            el.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "none";
          }}
        >
          Get started free
        </Link>
      </div>
    </nav>
  );
}
