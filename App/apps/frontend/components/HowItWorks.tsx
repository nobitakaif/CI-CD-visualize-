"use client";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    num: "01",
    title: "Drop nodes onto the canvas",
    desc: "Choose from a library of pre-built stages — build, test, scan, deploy, notify. Drag them onto the canvas and arrange them the way you think.",
  },
  {
    num: "02",
    title: "Connect and configure",
    desc: "Draw edges between nodes to define flow. Click any node to open its config panel — set environment variables, secrets, conditions, and timeouts.",
  },
  {
    num: "03",
    title: "Trigger and watch it run",
    desc: "Push a commit or click Run. Watch each node light up as it executes. Logs stream inline. Failures are pinpointed instantly on the canvas.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "100px 24px",
        background: "#0F1826",
        borderTop: "1px solid #1E2D40",
        borderBottom: "1px solid #1E2D40",
      }}
    >
      <ScrollReveal>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#06B6D4",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Process
        </p>
      </ScrollReveal>

      <ScrollReveal delay={80}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(30px, 4vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-1px",
            textAlign: "center",
            color: "#E2E8F0",
            maxWidth: 600,
            margin: "0 auto 64px",
            lineHeight: 1.15,
          }}
        >
          From zero to deployed in three steps
        </h2>
      </ScrollReveal>

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {steps.map((s, i) => (
          <ScrollReveal key={s.num} delay={i * 100}>
            <div
              style={{
                display: "flex",
                gap: 24,
                padding: "28px 0",
                borderBottom: i < steps.length - 1 ? "1px solid #1E2D40" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#3B82F6",
                  minWidth: 32,
                  marginTop: 2,
                }}
              >
                {s.num}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#E2E8F0",
                    marginBottom: 8,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
