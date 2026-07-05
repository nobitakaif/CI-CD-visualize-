"use client";
import Link from "next/link";
import PipelineCanvas from "./PipelineCanvas";
import { useState } from "react";
import BuildOption from "./buildOption";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background glows */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 400,
          background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "20%",
          width: 400,
          height: 300,
          background: "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
  
      {/* Badge */}
      <div
        className="animate-fade-up-1"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(59,130,246,0.10)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 32,
          fontSize: 13,
          fontWeight: 500,
          color: "#93C5FD",
        }}
      >
        
        <span
          className="animate-pulse-dot"
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#3B82F6",
            boxShadow: "0 0 8px #3B82F6",
          }}
        />
        Now in public beta &nbsp;·&nbsp; Free for solo developers
      </div>

      {/* Headline */}
      <h1
        className="animate-fade-up-2"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(42px, 7vw, 82px)",
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: "-2px",
          color: "#E2E8F0",
          maxWidth: 900,
        }}
      >
        Build CI/CD Pipelines<br />
        by{" "}
        <span className="gradient-text">Dragging,</span>{" "}
        Not Typing
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-up-3"
        style={{
          marginTop: 24,
          fontSize: "clamp(16px, 2vw, 19px)",
          color: "#64748B",
          maxWidth: 540,
          lineHeight: 1.65,
          fontWeight: 400,
        }}
      >
        Design, connect, and deploy your entire pipeline visually. No YAML headaches,
        no cryptic config files — just drag nodes onto a canvas and ship.
      </p>

      {/* CTA buttons */}
      <div
        className="animate-fade-up-4"
        style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}
      >
        <Link
          href="#"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            padding: "14px 28px",
            borderRadius: 10,
            textDecoration: "none",
            transition: "opacity 0.2s, transform 0.2s",
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L14 8L8 14M2 8H14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Start building free
        </Link>
        
        <Link
          href="#how-it-works"
          style={{
            padding: "13px 28px",
            fontSize: 15,
            background: "none",
            border: "1px solid #1E2D40",
            color: "#E2E8F0",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            borderRadius: 10,
            textDecoration: "none",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#3B82F6";
            el.style.background = "rgba(59,130,246,0.06)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#1E2D40";
            el.style.background = "none";
          }}
        >
          See how it works
        </Link>
      </div>

      {/* Pipeline preview */}
      <div
        className="animate-fade-up-5"
        style={{ marginTop: 64, width: "100%", maxWidth: 900 }}
      >
        <PipelineCanvas />
      </div>
    </section>
  );
}
