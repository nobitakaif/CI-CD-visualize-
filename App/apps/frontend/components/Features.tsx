"use client";

import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: "🎨",
    color: "rgba(59,130,246,0.12)",
    title: "Visual Canvas Editor",
    desc: "Drag and drop pipeline stages onto a React Flow canvas. Connect nodes with a click. Rearrange in seconds.",
  },
  {
    icon: "⚡",
    color: "rgba(6,182,212,0.12)",
    title: "Live Run Visualization",
    desc: "Watch your pipeline execute in real time. See data flow between stages as it happens, node by node.",
  },
  {
    icon: "🔗",
    color: "rgba(16,185,129,0.12)",
    title: "50+ Integrations",
    desc: "GitHub, GitLab, Docker, AWS, Vercel, Slack — pre-built connector nodes ready to drop in.",
  },
  {
    icon: "🛡️",
    color: "rgba(245,158,11,0.12)",
    title: "Approval Gates",
    desc: "Add manual approval nodes anywhere in the pipeline. Require sign-off before production deploys.",
  },
  {
    icon: "🔄",
    color: "rgba(239,68,68,0.12)",
    title: "Parallel Branches",
    desc: "Fork pipelines into parallel tracks, run tests and builds simultaneously, then merge back.",
  },
  {
    icon: "📦",
    color: "rgba(139,92,246,0.12)",
    title: "Export to Code",
    desc: "Export any pipeline as GitHub Actions, GitLab CI, or Jenkinsfile. Visual-first, code when you want.",
  },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: "100px 24px" }}>
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
          What you get
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
          Everything your team needs to ship faster
        </h2>
      </ScrollReveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {features.map((f, i) => (
          <ScrollReveal key={f.title} delay={i * 60}>
            <div
              style={{
                background: "#0F1826",
                border: "1px solid #1E2D40",
                borderRadius: 14,
                padding: 28,
                transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(59,130,246,0.4)";
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "#1E2D40";
                el.style.transform = "none";
                el.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: f.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                  fontSize: 20,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#E2E8F0",
                  marginBottom: 10,
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
