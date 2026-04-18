import { ImageResponse } from "next/og";

export const alt = "ScandWave Energy — A new approach to wave energy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #03070d 0%, #061019 60%, #0a1a2a 100%)",
          color: "#eef3f6",
          padding: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M2 12 Q5 7, 8 12 T14 12 T20 12 T22 12" stroke="#5fd4f0" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            <path d="M2 16 Q6 12, 10 16 T18 16 T22 16" stroke="#8fb3c7" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="1.4" fill="#5fd4f0"/>
          </svg>
          <span style={{ fontSize: 18, letterSpacing: 4, textTransform: "uppercase" }}>
            Scand<span style={{ color: "#5fd4f0" }}>Wave</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 14, letterSpacing: 4, textTransform: "uppercase", color: "#8fb3c7" }}>
            Pre-commercial · TRL 3 → 5
          </span>
          <div style={{ fontSize: 96, fontWeight: 300, lineHeight: 1, letterSpacing: -2, display: "flex", flexDirection: "column" }}>
            <span>A new approach to</span>
            <span style={{ fontStyle: "italic", color: "#5fd4f0" }}>wave energy</span>
          </div>
          <span style={{ fontSize: 22, color: "#c7d1d8", marginTop: 10, maxWidth: 820 }}>
            From scientific theory and CFD simulation — to validation in relevant environment.
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, letterSpacing: 3, textTransform: "uppercase", color: "#8fb3c7" }}>
          <span>Scand Wave Energy AB · 559532-7338</span>
          <span>scandwave.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
