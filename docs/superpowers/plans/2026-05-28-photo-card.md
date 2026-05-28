# PhotoCard — Stamp Frame with Sci-fi Scan Hover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a postage-stamp styled portrait card with a techy phosphor scan-line reveal animation to the portfolio left column.

**Architecture:** Self-contained `PhotoCard` component using inline styles + two shared CSS classes (`photo-scan`, `photo-crt`) in `index.css`. Scan line triggered by CSS `:hover` on `.photo-card-wrap`. Overlay timing (0.9s delay) and character scramble use React `useState` + `setTimeout` via a `ScrambleText` sub-component.

**Tech Stack:** React 18, TypeScript, CSS keyframe animations, no extra dependencies

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `artifacts/portfolio/src/index.css` | Modify | Add scan keyframes + `.photo-scan`, `.photo-crt` classes |
| `artifacts/portfolio/src/components/PhotoCard.tsx` | Create | Stamp frame, overlays, scan line, overlay + scramble |
| `artifacts/portfolio/src/App.tsx` | Modify | Import PhotoCard, insert in LeftColumn |

---

## Task 1 — CSS keyframes + scan classes in index.css

**Files:**
- Modify: `artifacts/portfolio/src/index.css` (append at end of file)

- [ ] **Step 1: Append scan CSS to index.css**

Open `artifacts/portfolio/src/index.css` and add the following block at the very end of the file:

```css
/* ── PhotoCard: techy scan line ── */
@keyframes techScanDown {
  0%   { top: -4px; opacity: 0; }
  4%   { opacity: 1; }
  88%  { opacity: 1; }
  94%  { top: calc(100% + 4px); opacity: 0.4; }
  100% { top: calc(100% + 4px); opacity: 0; }
}

@keyframes scanNoise {
  0%   { background-position: 0 0; }
  25%  { background-position: 0 -5px; }
  50%  { background-position: 0 3px; }
  75%  { background-position: 0 -8px; }
  100% { background-position: 0 0; }
}

/* Scan beam — multi-layer phosphor glow */
.photo-scan {
  position: absolute;
  left: -1px;
  right: -1px;
  top: -4px;
  height: 3px;
  z-index: 20;
  pointer-events: none;
  opacity: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(34, 197, 94, 0.3) 8%,
    #4ade80 25%,
    #bbf7d0 50%,
    #4ade80 75%,
    rgba(34, 197, 94, 0.3) 92%,
    transparent 100%
  );
  box-shadow:
    0 0 2px 1px rgba(74, 222, 128, 0.95),
    0 0 6px 2px rgba(34, 197, 94, 0.75),
    0 0 16px 4px rgba(34, 197, 94, 0.5),
    0 0 32px 8px rgba(34, 197, 94, 0.25),
    0 0 56px 12px rgba(34, 197, 94, 0.1);
}

/* Phosphor trail above the beam */
.photo-scan::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 2px;
  height: 50px;
  background: linear-gradient(
    to top,
    transparent 0%,
    rgba(34, 197, 94, 0.05) 50%,
    rgba(34, 197, 94, 0.13) 100%
  );
  pointer-events: none;
}

/* CRT noise bars that follow the beam */
.photo-scan::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 3px;
  height: 80px;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    rgba(34, 197, 94, 0.035) 2px,
    rgba(34, 197, 94, 0.035) 3px
  );
  pointer-events: none;
  opacity: 0;
  animation: scanNoise 0.1s steps(1) infinite;
}

/* Trigger scan on hover */
.photo-card-wrap:hover .photo-scan {
  animation: techScanDown 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

.photo-card-wrap:hover .photo-scan::after {
  opacity: 1;
}

/* CRT scanline texture on the photo */
.photo-crt {
  position: relative;
}

.photo-crt::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 1px,
    rgba(0, 0, 0, 0.06) 1px,
    rgba(0, 0, 0, 0.06) 2px
  );
  pointer-events: none;
  z-index: 3;
}
```

- [ ] **Step 2: Verify CSS was appended correctly**

Run:
```bash
grep -c "techScanDown\|photo-scan\|photo-crt" "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio/artifacts/portfolio/src/index.css"
```
Expected: `4` or more (each string appears at least once)

- [ ] **Step 3: Typecheck**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio/artifacts/portfolio" && pnpm typecheck
```
Expected: no errors (CSS changes don't affect TS)

- [ ] **Step 4: Commit**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio" && git add artifacts/portfolio/src/index.css && git commit -m "feat: add techy phosphor scan-line CSS keyframes for PhotoCard"
```

---

## Task 2 — Create PhotoCard.tsx

**Files:**
- Create: `artifacts/portfolio/src/components/PhotoCard.tsx`

- [ ] **Step 1: Create the component**

Create `artifacts/portfolio/src/components/PhotoCard.tsx` with the following content:

```tsx
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
          {/* Portrait image */}
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
            /* Placeholder when portrait.jpg is not yet dropped in */
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

          {/* Always-visible badge */}
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

          {/* Always-visible code label */}
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

          {/* Techy scan line (CSS-animated via .photo-card-wrap:hover) */}
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

        {/* Footer bar */}
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
```

- [ ] **Step 2: Typecheck**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio/artifacts/portfolio" && pnpm typecheck
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio" && git add artifacts/portfolio/src/components/PhotoCard.tsx && git commit -m "feat: add PhotoCard stamp frame with phosphor scan + scramble reveal"
```

---

## Task 3 — Wire PhotoCard into App.tsx

**Files:**
- Modify: `artifacts/portfolio/src/App.tsx`

- [ ] **Step 1: Add import**

In `artifacts/portfolio/src/App.tsx`, add the following import after the existing `LiveClock` import:

```tsx
import { PhotoCard } from "@/components/PhotoCard";
```

- [ ] **Step 2: Insert PhotoCard in LeftColumn**

In the `LeftColumn` function, find the `{/* Header */}` comment block. Insert `PhotoCard` immediately above it, inside a `Reveal`:

Find this block:
```tsx
      {/* Header */}
      <div>
        <Reveal variant="blur" duration={900} delay={80}>
```

Replace with:
```tsx
      {/* Photo card */}
      <Reveal variant="fade" duration={600}>
        <PhotoCard src={ASSET("media/portrait.jpg")} />
      </Reveal>

      {/* Header */}
      <div>
        <Reveal variant="blur" duration={900} delay={80}>
```

- [ ] **Step 3: Typecheck**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio/artifacts/portfolio" && pnpm typecheck
```
Expected: no errors

- [ ] **Step 4: Verify in browser**

Open http://localhost:3000. The left column should show a stamp-frame card above the name. Hover over it — the green phosphor scan line should sweep top-to-bottom with a trailing glow, then the data overlay fades in with characters scrambling into place.

If the portrait photo isn't added yet, a person-icon placeholder renders instead — this is correct behaviour.

- [ ] **Step 5: Commit**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio" && git add artifacts/portfolio/src/App.tsx && git commit -m "feat: add PhotoCard to LeftColumn above header"
```

---

## Photo Asset (manual step)

Drop the portrait photo at:
```
artifacts/portfolio/public/media/portrait.jpg
```

The component auto-upgrades from placeholder to photo — no code change needed.
