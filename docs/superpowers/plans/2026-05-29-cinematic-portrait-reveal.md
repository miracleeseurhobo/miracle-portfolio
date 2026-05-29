# Cinematic Portrait Reveal — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Portrait fills the left column backdrop, invisible at rest, atmospherically revealed on coffee-button hover — cinematic, grayscale, edge-masked, with subtle film grain.

**Architecture:** A single `div.portrait-wrap` (first child of `LeftColumn`) is positioned absolute over the entire sticky sidebar. `useState(false)` in `LeftColumn` controls its opacity. `onMouseEnter`/`onMouseLeave` on the `coffee-wrapper` span toggle the state. CSS handles filter, mask, grain (via `::after`), and asymmetric transition timing. `prefers-reduced-motion` disables the transition via `!important` override of the inline style.

**Tech Stack:** React 18, TypeScript, CSS (no new dependencies)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `artifacts/portfolio/src/index.css` | Modify — append at end | `.portrait-wrap` position, filter, mask, grain, reduced-motion |
| `artifacts/portfolio/src/App.tsx` | Modify | `useState`, portrait div, `relative` on column, hover handlers |

---

## Task 1 — CSS in index.css

**Files:**
- Modify: `artifacts/portfolio/src/index.css` (append at end)

- [ ] **Step 1: Append portrait CSS**

Open `artifacts/portfolio/src/index.css` and add at the very end:

```css
/* ── Cinematic portrait reveal ── */
.portrait-wrap {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-size: cover;
  background-position: center 15%;
  filter: grayscale(100%) contrast(0.65) brightness(0.45);
  mask-image: radial-gradient(ellipse 70% 80% at 50% 28%, black 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 70% 80% at 50% 28%, black 0%, transparent 100%);
}

/* Film grain via tiled SVG noise */
.portrait-wrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: 0.06;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* Disable transition for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .portrait-wrap {
    transition: none !important;
  }
}
```

- [ ] **Step 2: Verify no syntax errors**

```bash
grep -c "portrait-wrap\|portrait-grain" "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio/artifacts/portfolio/src/index.css"
```

Expected: `3` or more

- [ ] **Step 3: Commit**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio" && git add artifacts/portfolio/src/index.css && git commit -m "feat: add cinematic portrait reveal CSS"
```

---

## Task 2 — React wiring in App.tsx

**Files:**
- Modify: `artifacts/portfolio/src/App.tsx`

- [ ] **Step 1: Add `useState` import**

The file already imports from `react` but may not include `useState`. Find the top of App.tsx and ensure:

```tsx
import { useState } from "react";
```

If there's already a React import line, add `useState` to it.

- [ ] **Step 2: Add `useState` and portrait div to `LeftColumn`**

Find this exact line:
```tsx
function LeftColumn() {
  return (
    <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] p-6 md:p-12 lg:p-20 md:h-screen md:sticky md:top-0 md:overflow-y-auto flex flex-col gap-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Status pill */}
```

Replace with:
```tsx
function LeftColumn() {
  const [portraitVisible, setPortraitVisible] = useState(false);
  return (
    <div className="relative w-full md:w-[40%] lg:w-[35%] xl:w-[30%] p-6 md:p-12 lg:p-20 md:h-screen md:sticky md:top-0 md:overflow-y-auto flex flex-col gap-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* Cinematic portrait backdrop — revealed on coffee button hover */}
      <div
        className="portrait-wrap"
        style={{
          backgroundImage: `url(${ASSET("media/portrait.jpg")})`,
          opacity: portraitVisible ? 1 : 0,
          transition: portraitVisible
            ? "opacity 1.2s ease-out"
            : "opacity 0.6s ease-in",
        }}
        aria-hidden="true"
      />
      {/* Status pill */}
```

- [ ] **Step 3: Add hover handlers to coffee-wrapper**

Find this exact line:
```tsx
          <span className="coffee-wrapper">
```

Replace with:
```tsx
          <span
            className="coffee-wrapper"
            onMouseEnter={() => setPortraitVisible(true)}
            onMouseLeave={() => setPortraitVisible(false)}
          >
```

- [ ] **Step 4: Typecheck**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio/artifacts/portfolio" && pnpm typecheck 2>&1
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio" && git add artifacts/portfolio/src/App.tsx && git commit -m "feat: cinematic portrait reveals on coffee button hover"
```

---

## Task 3 — Build & verify in browser

**Files:** none (read-only verification)

- [ ] **Step 1: Build**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio" && pnpm build 2>&1 | tail -10
```

Expected: `✓ built in` with no errors

- [ ] **Step 2: Check in dev server**

Open `http://localhost:3000`. Confirm:
- Left column portrait is invisible at rest
- Hovering the "Coffee chat" button causes the portrait to slowly fade in (1.2s) from black
- Moving cursor away fades it out (0.6s)
- Portrait is grayscale, atmospheric, edges dissolved to black
- Film grain texture is subtly visible
- All other content (name, bio, contact) remains readable on top of the portrait

- [ ] **Step 3: Push to deploy**

```bash
cd "/Users/macbook/Desktop/MY PORTFOLIIO/My-Portfolio" && git push origin main
```
