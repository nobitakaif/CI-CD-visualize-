"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #1E2D40",
        padding: "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 13,
        color: "#64748B",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 16,
          color: "#E2E8F0",
        }}
      >
        PipeFlow
      </div>

      <div>© 2025 PipeFlow. All rights reserved.</div>

      <div style={{ display: "flex", gap: 24 }}>
        {["Privacy", "Terms", "GitHub"].map((item) => (
          <Link
            key={item}
            href="#"
            style={{
              color: "#64748B",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#E2E8F0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#64748B")}
          >
            {item}
          </Link>
        ))}
      </div>
    </footer>
  );
}
