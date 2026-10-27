import { ImageResponse } from "next/og";
import { siteName } from "@/lib/site";

export const alt = "Dikesh Ganboi | Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#F3EFE6",
        color: "#15130F",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
        height: "100%",
      }}
    >
      <div style={{ fontSize: 76, fontFamily: "serif", color: "#15130F" }}>
        {siteName}
      </div>
      <div style={{ marginTop: 24, fontSize: 32, color: "#4A463D" }}>
        Full-stack apps, tested before they ship.
      </div>
      <div style={{ marginTop: 100, fontSize: 24, color: "#FF4A1C" }}>
        dikeshganboi.me
      </div>
    </div>,
    size,
  );
}
