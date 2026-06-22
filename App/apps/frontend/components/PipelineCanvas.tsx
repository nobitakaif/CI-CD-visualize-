"use client";

import { useEffect, useRef } from "react";

interface PipeNode {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  status: "done" | "running" | "pending";
}

interface Packet {
  from: string;
  to: string;
  t: number;
  speed: number;
}

const NODES: PipeNode[] = [
  { id: "source",  label: "Git Push",   color: "#3B82F6", x: 0.08, y: 0.50, status: "done" },
  { id: "build",   label: "Build",      color: "#06B6D4", x: 0.28, y: 0.25, status: "done" },
  { id: "test",    label: "Test",       color: "#10B981", x: 0.28, y: 0.75, status: "done" },
  { id: "scan",    label: "Sec Scan",   color: "#F59E0B", x: 0.50, y: 0.50, status: "running" },
  { id: "stage",   label: "Staging",    color: "#8B5CF6", x: 0.70, y: 0.30, status: "pending" },
  { id: "approve", label: "Approve",    color: "#EF4444", x: 0.70, y: 0.70, status: "pending" },
  { id: "prod",    label: "Production", color: "#10B981", x: 0.90, y: 0.50, status: "pending" },
];

const EDGES: [string, string][] = [
  ["source","build"], ["source","test"],
  ["build","scan"],   ["test","scan"],
  ["scan","stage"],   ["scan","approve"],
  ["stage","prod"],   ["approve","prod"],
];

const ACTIVE_EDGES: [string, string][] = [
  ["source","build"], ["source","test"],
  ["build","scan"],   ["test","scan"],
];

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function bezierPoint(t: number, p0: number, p1: number, p2: number, p3: number): number {
  return (
    Math.pow(1 - t, 3) * p0 +
    3 * Math.pow(1 - t, 2) * t * p1 +
    3 * (1 - t) * Math.pow(t, 2) * p2 +
    Math.pow(t, 3) * p3
  );
}

export default function PipelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let tick = 0;
    let packetTimer = 0;
    const packets: Packet[] = [];
    let rafId: number;

    function resize() {
      if (!canvas) return;
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    }
    resize();
    window.addEventListener("resize", resize);

    function getPos(id: string) {
      const n = NODES.find((n) => n.id === id)!;
      const W = canvas!.width / dpr;
      const H = canvas!.height / dpr;
      return { x: n.x * W, y: n.y * H };
    }

    function drawEdge(fromId: string, toId: string) {
      if (!ctx || !canvas) return;
      const W = canvas.width / dpr;
      const from = getPos(fromId);
      const to = getPos(toId);

      ctx.save();
      ctx.scale(dpr, dpr);

      const grd = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
      grd.addColorStop(0, "rgba(59,130,246,0.25)");
      grd.addColorStop(1, "rgba(6,182,212,0.25)");
      ctx.strokeStyle = grd;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.lineDashOffset = -tick * 0.5;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.bezierCurveTo(
        from.x + (to.x - from.x) * 0.4, from.y,
        to.x - (to.x - from.x) * 0.4, to.y,
        to.x, to.y
      );
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    function drawPacket(fromId: string, toId: string, t: number) {
      if (!ctx || !canvas) return;
      const from = getPos(fromId);
      const to = getPos(toId);

      const cp1x = from.x + (to.x - from.x) * 0.4;
      const cp2x = to.x - (to.x - from.x) * 0.4;

      const px = bezierPoint(t, from.x, cp1x, cp2x, to.x);
      const py = bezierPoint(t, from.y, from.y, to.y, to.y);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);

      const grad = ctx.createRadialGradient(px, py, 0, px, py, 5);
      grad.addColorStop(0, "rgba(255,255,255,0.9)");
      grad.addColorStop(1, "rgba(59,130,246,0.6)");
      ctx.fillStyle = grad;
      ctx.shadowColor = "#3B82F6";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
    }

    function drawNode(n: PipeNode) {
      if (!ctx || !canvas) return;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const x = n.x * W;
      const y = n.y * H;
      const ww = 90;
      const hh = 40;

      ctx.save();
      ctx.scale(dpr, dpr);

      if (n.status === "running") {
        const pulse = Math.sin(tick * 0.06) * 0.5 + 0.5;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 20 + pulse * 20;
      } else if (n.status === "done") {
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10;
      }

      roundRect(ctx, x - ww / 2, y - hh / 2, ww, hh, 10);
      ctx.fillStyle = n.status === "pending" ? "rgba(10,16,28,0.8)" : "rgba(15,24,38,0.95)";
      ctx.fill();

      ctx.strokeStyle = n.status === "pending" ? "rgba(30,45,64,0.8)" : n.color;
      ctx.lineWidth = n.status === "running" ? 2 : 1.5;
      ctx.globalAlpha = n.status === "pending" ? 0.5 : 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      ctx.font = "500 11px Inter, sans-serif";
      ctx.fillStyle = n.status === "pending" ? "#64748B" : "#E2E8F0";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(n.label, x, y);

      if (n.status === "done") {
        ctx.beginPath();
        ctx.arc(x + ww / 2 - 8, y - hh / 2 + 8, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#10B981";
        ctx.fill();
      } else if (n.status === "running") {
        const pulse = Math.sin(tick * 0.1) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(x + ww / 2 - 8, y - hh / 2 + 8, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,158,11,${0.5 + pulse * 0.5})`;
        ctx.fill();
      }

      ctx.restore();
    }

    function spawnPacket() {
      const edge = ACTIVE_EDGES[Math.floor(Math.random() * ACTIVE_EDGES.length)];
      packets.push({ from: edge[0], to: edge[1], t: 0, speed: 0.007 + Math.random() * 0.006 });
    }

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      EDGES.forEach(([f, t]) => drawEdge(f, t));

      packetTimer++;
      if (packetTimer > 45) { spawnPacket(); packetTimer = 0; }

      for (let i = packets.length - 1; i >= 0; i--) {
        packets[i].t += packets[i].speed;
        if (packets[i].t >= 1) { packets.splice(i, 1); continue; }
        drawPacket(packets[i].from, packets[i].to, packets[i].t);
      }

      NODES.forEach(drawNode);
      tick++;
      rafId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      style={{
        background: "#0F1826",
        border: "1px solid #1E2D40",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 0 60px rgba(59,130,246,0.07), 0 40px 80px rgba(0,0,0,0.5)",
      }}
    >
      {/* Window bar */}
      <div
        style={{
          background: "#0A1020",
          borderBottom: "1px solid #1E2D40",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
        <span
          style={{
            marginLeft: 12,
            fontSize: 12,
            color: "#64748B",
            fontFamily: "var(--font-display)",
          }}
        >
          my-app / production-pipeline.flow
        </span>
      </div>
      {/* Canvas */}
      <div style={{ width: "100%", height: 220, position: "relative" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>
    </div>
  );
}
