import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "지혜의 서 — 고전의 지혜를 현대의 언어로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fontData = readFileSync(
    path.join(process.cwd(), "src/app/_og/NotoSerifKR-Subset.otf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at top, #f0e1c0 0%, #d9c9a4 55%, #b8a478 100%)",
          color: "#2e241a",
          fontFamily: "NotoSerifKR",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            fontSize: 22,
            letterSpacing: "0.5em",
            color: "#7a6a4d",
            textTransform: "uppercase",
          }}
        >
          WISDOM BOOK
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 160,
            fontWeight: 500,
            letterSpacing: "0.08em",
            marginBottom: 60,
          }}
        >
          지혜의 서
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 50,
          }}
        >
          <div style={{ width: 100, height: 1, background: "#8a6b3f" }} />
          <div
            style={{
              width: 6,
              height: 6,
              background: "#8a6b3f",
              borderRadius: 999,
            }}
          />
          <div style={{ width: 100, height: 1, background: "#8a6b3f" }} />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "#4a3c2b",
            letterSpacing: "0.05em",
          }}
        >
          고전의 지혜를 현대의 언어로
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 60,
            fontSize: 18,
            letterSpacing: "0.35em",
            color: "#8a6b3f",
          }}
        >
          매일 한 구절 마음에 담아
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "NotoSerifKR",
          data: fontData,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
