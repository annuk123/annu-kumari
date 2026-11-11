


import { ImageResponse } from "next/og";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };
const ACCENT = "#D9A85F";
const BG = "#0B0D10";
const DOMAIN = "annu-kumari.nexralab.com"; // keep identical to layout.tsx

const FONT_URL = (weight: number) =>
  `https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-${weight}-normal.woff`;

async function loadFonts() {
  try {
    const [regular, bold] = await Promise.all(
      [500, 700].map(async (w) => {
        const res = await fetch(FONT_URL(w));
        if (!res.ok) throw new Error("font fetch failed");
        return res.arrayBuffer();
      })
    );
    return [
      { name: "JetBrains Mono", data: regular, weight: 500 as const, style: "normal" as const },
      { name: "JetBrains Mono", data: bold, weight: 700 as const, style: "normal" as const },
    ];
  } catch {
    // falls back to the default font if the CDN is unreachable
    return [];
  }
}

function clip(text: string, max: number) {
  const t = text.trim();
  return t.length > max ? t.slice(0, max - 1).trimEnd() + "…" : t;
}

function Card({
  label,
  title,
  summary,
  date,
}: {
  label: string;
  title: string;
  summary?: string;
  date?: string;
}) {
  const titleSize = title.length > 80 ? 46 : title.length > 50 ? 56 : 68;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 64px",
        background: BG,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        color: "#E6E6E6",
        fontFamily: "JetBrains Mono",
        position: "relative",
      }}
    >
      {/* corner marks */}
      <div style={{ position: "absolute", top: 28, left: 28, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, display: "flex" }} />
      <div style={{ position: "absolute", top: 28, right: 28, width: 20, height: 20, borderTop: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, display: "flex" }} />
      <div style={{ position: "absolute", bottom: 28, left: 28, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderLeft: `2px solid ${ACCENT}`, display: "flex" }} />
      <div style={{ position: "absolute", bottom: 28, right: 28, width: 20, height: 20, borderBottom: `2px solid ${ACCENT}`, borderRight: `2px solid ${ACCENT}`, display: "flex" }} />

      {/* top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          letterSpacing: 4,
          textTransform: "uppercase",
          paddingBottom: 20,
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div style={{ display: "flex", color: ACCENT }}>{label}</div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.45)" }}>{date ?? ""}</div>
      </div>

      {/* title + summary */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -1.5,
            color: "#FFFFFF",
          }}
        >
          {title}
        </div>
        {summary ? (
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 26,
              lineHeight: 1.45,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 960,
            }}
          >
            {summary}
          </div>
        ) : null}
      </div>

      {/* bottom row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 20,
          letterSpacing: 3,
          textTransform: "uppercase",
          paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", width: 12, height: 12, background: ACCENT, marginRight: 14 }} />
          <div style={{ display: "flex", color: "#FFFFFF" }}>Annu Kumari</div>
        </div>
        <div style={{ display: "flex" }}>Embedded · IoT · Robotics</div>
      </div>
    </div>
  );
}

export async function GET(req: Request) {
  const fonts = await loadFonts();
  const options = { ...SIZE, fonts };

  const slug = new URL(req.url).searchParams.get("slug");

  if (!slug) {
    return new ImageResponse(
      <Card label="// Build log" title="Annu Kumari" summary={DOMAIN} />,
      options
    );
  }

  let post = null;
  try {
    post = await fetchQuery(api.buildNotes.getBySlugPublic, { slug });
  } catch {
    /* fall through to the branded fallback */
  }

  if (!post) {
    return new ImageResponse(
      <Card label="// Build log" title="Annu Kumari" summary={DOMAIN} />,
      options
    );
  }

  const date = new Date(post.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return new ImageResponse(
    (
      <Card
        label="// Build log"
        title={clip(post.title, 110)}
        summary={post.summary ? clip(post.summary, 140) : undefined}
        date={date}
      />
    ),
    options
  );
}