import { useState, useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!·/|_-<>{}~";

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const frames = 18;
    const id = setInterval(() => {
      frame++;
      const progress = frame / frames;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "✦" || char === "·") return char;
            if (i / text.length < progress) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (frame >= frames) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [active, text]);

  return <>{display}</>;
}

const DATA_ROWS = [
  { key: "ROLE",   value: "UX DESIGNER"  },
  { key: "TOOLS",  value: "FIGMA · AI"   },
  { key: "STATUS", value: "AVAILABLE ✦"  },
];

export function PhotoCard({ src }: { src: string }) {
  const [overlayActive, setOverlayActive] = useState(false);
  const [imgError, setImgError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    timerRef.current = setTimeout(() => setOverlayActive(true), 900);
  };

  const handleLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOverlayActive(false);
  };

  return (
    <div
      className="photo-card-wrap"
      style={{ width: "110px", position: "relative", flexShrink: 0 }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Stamp shell */}
      <div
        style={{
          border: "2.5px solid #1e1e1e",
          borderRadius: "5px",
          background: "#0d0d0d",
          overflow: "hidden",
        }}
      >
        {/* Photo area */}
        <div
          className="photo-crt"
          style={{ width: "100%", height: "140px", overflow: "hidden" }}
        >
          {!imgError ? (
            <img
              src={src}
              alt="Miracle Eseurhobo"
              onError={() => setImgError(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                filter: "grayscale(100%) contrast(1.1)",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(160deg,#1c1c1c 0%,#0d0d0d 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span style={{ fontSize: "6px", color: "#2a2a2a", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                ADD PHOTO
              </span>
            </div>
          )}

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: "7px",
              left: "7px",
              background: "#22c55e",
              color: "#000",
              fontSize: "7px",
              fontWeight: 700,
              padding: "2px 5px",
              borderRadius: "3px",
              letterSpacing: "0.04em",
              zIndex: 10,
            }}
          >
            4+ YRS XP
          </div>

          {/* Code label */}
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              right: "5px",
              color: "#22c55e",
              fontSize: "6px",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              zIndex: 10,
            }}
          >
            · MRC_DSN_V1
          </div>

          {/* Techy scan line (driven by .photo-card-wrap:hover CSS) */}
          <div className="photo-scan" />

          {/* Data overlay — fades in after scan completes */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.78)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "6px",
              opacity: overlayActive ? 1 : 0,
              transition: overlayActive ? "opacity 0.3s" : "opacity 0.15s",
              zIndex: 15,
              pointerEvents: "none",
            }}
          >
            {DATA_ROWS.map(({ key, value }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(34,197,94,0.15)",
                  padding: "2px 0",
                }}
              >
                <span
                  style={{
                    fontSize: "6px",
                    fontFamily: "monospace",
                    color: "rgba(34,197,94,0.45)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {key}
                </span>
                <span
                  style={{
                    fontSize: "6px",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#22c55e",
                    letterSpacing: "0.06em",
                  }}
                >
                  <ScrambleText text={value} active={overlayActive} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "5px 8px 6px",
            borderTop: "1px solid #1e1e1e",
            fontSize: "6px",
            fontFamily: "monospace",
            color: "#22c55e",
            letterSpacing: "0.1em",
          }}
        >
          MIRACLE ESEURHOBO · UX DESIGNER
        </div>
      </div>
    </div>
  );
}
