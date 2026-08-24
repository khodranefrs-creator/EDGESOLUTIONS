import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ClearEdge Solutions — engineered for the connection between";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0e11",
          padding: 72,
          color: "#f4f2ed",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              background: "#0092fc",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              color: "#a6acb4",
              textTransform: "uppercase",
            }}
          >
            ClearEdge Solutions, Inc.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 4,
              width: 160,
              background: "#0092fc",
              marginBottom: 40,
            }}
          />
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Engineered for the
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: "#0092fc",
            }}
          >
            connection between.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#737a83",
            textTransform: "uppercase",
          }}
        >
          <div>Fiber Optic · Copper · Electro-Mechanical</div>
          <div>San Jose, CA</div>
        </div>
      </div>
    ),
    size,
  );
}
