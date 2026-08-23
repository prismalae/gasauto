import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

/**
 * Site-wide OG card. Rendered at build time, using the brand palette sampled
 * from the logo. Kept typographic — no remote assets, so nothing can fail to
 * load during the build.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf9f6",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#5a6660",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <div style={{ width: 40, height: 2, background: "#0b5227" }} />
          Sharjah, UAE
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 28,
            fontSize: 62,
            fontWeight: 400,
            lineHeight: 1.12,
            color: "#14201a",
          }}
        >
          <span>Range Rover, Land Rover,</span>
          <span style={{ color: "#0b5227" }}>Defender &amp; Jaguar Specialists</span>
        </div>

        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#5a6660" }}>
          Dealer-level diagnostics · Genuine parts · UAE-wide pickup &amp; delivery
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 40,
            fontWeight: 600,
            color: "#14201a",
            letterSpacing: 1,
          }}
        >
          GAS&nbsp;<span style={{ color: "#0b5227" }}>AUTO</span>
        </div>
      </div>
    ),
    size,
  );
}
