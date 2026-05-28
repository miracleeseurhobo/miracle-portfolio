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
      style={{ width: "100%", position: "relative" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Stamp shell */}
      <div
        style={{
          border: "1.5px solid #1e1e1e",
          borderRadius: "8px",
          background: "#0a0a0a",
          overflow: "hidden",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        {/* Photo area */}
        <div
          className="photo-crt"
          style={{ width: "100%", height: "320px", overflow: "hidden", position: "relative" }}
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
                filter: "grayscale(100%) contrast(1.15) brightness(0.9)",
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
                gap: "6px",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <span style={{ fontSize: "7px", color: "#252525", fontFamily: "monospace", letterSpacing: "0.12em" }}>
                ADD PHOTO
              </span>
            </div>
          )}

          {/* Bottom gradient vignette */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "120px",
              background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />

          {/* Ghost name — barely legible watermark burned into photo */}
          <div
            style={{
              position: "absolute",
              bottom: "44px",
              left: "12px",
              right: "12px",
              zIndex: 5,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--app-font-luxury)",
                fontSize: "clamp(17px, 3.5vw, 24px)",
                fontWeight: 600,
                fontStretch: "115%",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.13)",
                lineHeight: 1.05,
                mixBlendMode: "screen",
              }}
            >
              Miracle Eseurhobo
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "8px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.08)",
                marginTop: "4px",
                mixBlendMode: "screen",
              }}
            >
              UX Designer · AI Dev
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "#22c55e",
              color: "#000",
              fontSize: "8px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "4px",
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
              bottom: "8px",
              right: "10px",
              color: "rgba(34,197,94,0.5)",
              fontSize: "7px",
              fontFamily: "monospace",
              letterSpacing: "0.12em",
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
              background: "rgba(0,0,0,0.82)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "14px",
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
                  borderBottom: "1px solid rgba(34,197,94,0.12)",
                  padding: "5px 0",
                }}
              >
                <span
                  style={{
                    fontSize: "8px",
                    fontFamily: "monospace",
                    color: "rgba(34,197,94,0.4)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {key}
                </span>
                <span
                  style={{
                    fontSize: "8px",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "#22c55e",
                    letterSpacing: "0.08em",
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
            padding: "8px 12px 10px",
            borderTop: "1px solid #161616",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "7px",
              fontFamily: "monospace",
              color: "rgba(34,197,94,0.6)",
              letterSpacing: "0.12em",
            }}
          >
            MIRACLE ESEURHOBO
          </span>
          <span
            style={{
              fontSize: "7px",
              fontFamily: "monospace",
              color: "rgba(34,197,94,0.3)",
              letterSpacing: "0.08em",
            }}
          >
            UX DESIGNER
          </span>
        </div>
      </div>
    </div>
  );
}
