"use client";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export default function CTA() {
  return (
    <section id="pricing" style={{ padding: "80px 24px 120px", textAlign: "center" }}>
      <ScrollReveal>
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.06))",
            border: "1px solid rgba(59,130,246,0.2)",
            borderRadius: 20,
            padding: "64px 48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative glow */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 4vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.8px",
              color: "#E2E8F0",
              marginBottom: 16,
              position: "relative",
            }}
          >
            Your first pipeline is one drag away
          </h2>
          <p
            style={{
              color: "#64748B",
              fontSize: 16,
              marginBottom: 36,
              lineHeight: 1.6,
              position: "relative",
            }}
          >
            No credit card. No YAML. No onboarding call. Sign up and have a working
            pipeline running in under five minutes.
          </p>
          <Link
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 600,
              padding: "15px 32px",
              borderRadius: 10,
              textDecoration: "none",
              transition: "opacity 0.2s, transform 0.2s",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.88";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.transform = "none";
            }}
          >
            Build your pipeline free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M8 3L13 8L8 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
