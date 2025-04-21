import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get("title") || "DevPortfolio"

    // Load fonts
    const geistBold = await fetch(new URL("/fonts/Geist-Bold.ttf", req.url)).then((res) => res.arrayBuffer())

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #7ae582 2%, transparent 0%), radial-gradient(circle at 75px 75px, #b388ff 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(10, 10, 10, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: 16,
            padding: 40,
            boxShadow: "0 0 20px rgba(122, 229, 130, 0.5)",
            border: "1px solid rgba(122, 229, 130, 0.3)",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontFamily: "Geist Bold",
              background: "linear-gradient(to right, #7ae582, #b388ff)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 20,
              textAlign: "center",
              width: "100%",
            }}
          >
            DevPortfolio
          </div>
          <div
            style={{
              fontSize: 40,
              fontFamily: "Geist Bold",
              color: "white",
              textAlign: "center",
              width: "100%",
            }}
          >
            {title}
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist Bold",
            data: geistBold,
            style: "normal",
            weight: 700,
          },
        ],
      },
    )
  } catch (e) {
    console.error(e)
    return new Response("Failed to generate OG image", { status: 500 })
  }
}
