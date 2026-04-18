import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#03070d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M2 12 Q5 7, 8 12 T14 12 T20 12 T22 12"
            stroke="#5fd4f0"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M2 16 Q6 12, 10 16 T18 16 T22 16"
            stroke="#8fb3c7"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="1.4" fill="#5fd4f0" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
