"use client";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { num: "5×",    label: "Faster pipeline setup" },
  { num: "10k+",  label: "Pipelines deployed" },
  { num: "Zero",  label: "YAML required" },
];

export default function Stats() {
  return (
    <section style={{ padding: "0 24px 100px" }}>
      <ScrollReveal>
        <div
          style={{
            display: "flex",
            maxWidth: 700,
            margin: "0 auto",
            border: "1px solid #1E2D40",
            borderRadius: 14,
            overflow: "hidden",
            background: "#0F1826",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                padding: "36px 24px",
                textAlign: "center",
                borderRight: i < stats.length - 1 ? "1px solid #1E2D40" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 38,
                  fontWeight: 700,
                  letterSpacing: "-1px",
                  background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: 13, color: "#64748B", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
