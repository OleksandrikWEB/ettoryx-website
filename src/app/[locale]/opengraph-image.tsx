import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ettoryx — Custom & Outsourcing Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
        }}
      >
        {/* Gold accent bar */}
        <div style={{ width: 56, height: 4, background: "#C09B5B", marginBottom: 48, borderRadius: 2 }} />

        {/* Company name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: 28,
          }}
        >
          ettoryx
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            color: "#9CA3AF",
            lineHeight: 1.5,
            maxWidth: 720,
          }}
        >
          Custom & Outsourcing Development — CRM, ERP, Apps &amp; AI Automation
        </div>

        {/* Domain */}
        <div
          style={{
            marginTop: 64,
            fontSize: 22,
            color: "#C09B5B",
            letterSpacing: "0.5px",
          }}
        >
          ettoryx.com
        </div>
      </div>
    ),
    { ...size }
  );
}
