import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const alt = "Dikesh Ganboi | Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0f",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
        height: "100%",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(139,92,246,.35), transparent 35%), radial-gradient(circle at 85% 70%, rgba(34,211,238,.25), transparent 35%)",
      }}
    >
      <div style={{ fontSize: 76, fontWeight: 700, background: "linear-gradient(110deg,#8b5cf6,#22d3ee)", backgroundClip: "text", color: "transparent" }}>
        {siteName}
      </div>
      <div style={{ marginTop: 24, fontSize: 32, color: "#d4d4d8" }}>
        Full-Stack Developer | IEEE Published Researcher
      </div>
      <div style={{ marginTop: 100, fontSize: 24, color: "#a1a1aa" }}>
        dikeshganboi.me
      </div>
    </div>,
    size,
  );
}
