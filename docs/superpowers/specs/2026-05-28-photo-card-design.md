# PhotoCard — Stamp Frame with Sci-fi Scan Hover

**Date:** 2026-05-28
**Status:** Approved

---

## Goal

Add a styled portrait photo card to the portfolio's left column, above the name/header block. The card uses a postage-stamp aesthetic matching the dark portfolio theme, with a sci-fi green scan-line reveal animation on hover.

---

## Component

**File:** `artifacts/portfolio/src/components/PhotoCard.tsx`
**Placement:** First child inside `LeftColumn` in `App.tsx`, above the `{/* Header */}` block, wrapped in a `Reveal` fade-in (variant `"fade"`, duration 600).

---

## Visual Design

### Frame
- Postage-stamp shell: `2.5px` solid border (`#1e1e1e`), `border-radius: 5px`
- Perforated edge: repeating `radial-gradient` masks on all four sides (circles cut into the border)
- Width: `110px`, portrait aspect ratio (~`110 × 140px` photo area)
- Background: `#0d0d0d`

### Photo
- Source: `public/media/portrait.jpg` — referenced via `ASSET("media/portrait.jpg")`
- CSS filter: `grayscale(100%) contrast(1.1)` — auto-converts any colour source photo
- `object-fit: cover`, fills the photo area

### Always-visible overlays
| Element | Position | Style |
|---|---|---|
| `4+ YRS XP` badge | top-left, 7px inset | green pill (`#22c55e` bg, black text, 7px bold) |
| `· MRC_DSN_V1` code | bottom-right, 5px inset | monospace, `#22c55e`, 6px |

### Footer bar
- `padding: 5px 8px 6px`, `border-top: 1px solid #1e1e1e`
- Text: `MIRACLE ESEURHOBO · UX DESIGNER`
- Font: monospace, `6px`, `#22c55e`, `letter-spacing: 0.1em`

---

## Hover Animation — Sci-fi Scan

The outer wrapper gets `group` (Tailwind). All hover states respond to cursor entering the card.

### Step 1 — Scan line (0 → 1.2s)
- Element: absolutely positioned `div`, `height: 2px`, full width, `z-index: 15`
- Color: `rgba(34,197,94,0.7)` with `box-shadow: 0 0 8px #22c55e, 0 0 20px rgba(34,197,94,0.4)`
- Animation: `@keyframes scanDown` — translates from `top: -2px` to `top: 100%` over `1.2s ease-in-out`, then fades out
- Triggered by CSS `:hover` on the wrapper (no JS required)

### Step 2 — Data overlay (fades in at 0.8s delay)
- Element: `position: absolute; inset: 0; background: rgba(0,0,0,0.78)`
- `opacity: 0` → `opacity: 1`, `transition: opacity 0.3s 0.8s`
- Three data rows, bottom-aligned (`justify-content: flex-end`):

| Key | Value |
|---|---|
| `ROLE` | `UX DESIGNER` |
| `TOOLS` | `FIGMA · AI` |
| `STATUS` | `AVAILABLE ✦` |

- Row style: `display: flex; justify-content: space-between`, separated by `1px solid rgba(34,197,94,0.15)`
- Key: `6px monospace, #22c55e66` · Value: `6px monospace bold, #22c55e`

### Mouse-leave
- Overlay fades out instantly (no delay on leave — `transition: opacity 0.2s`)
- Scan line resets automatically: CSS `:hover` removes the `animation` rule, so the element snaps back to `top: -2px`; the next hover re-triggers it from the start

---

## Photo Asset

The user must place their portrait at:
```
artifacts/portfolio/public/media/portrait.jpg
```

The component renders a visible placeholder (person icon + `ADD PHOTO` label) if the image 404s, so the UI never breaks without the file.

---

## Files Changed

| File | Change |
|---|---|
| `src/components/PhotoCard.tsx` | New component |
| `src/App.tsx` | Import `PhotoCard`, insert above `{/* Header */}` block |
| `public/media/portrait.jpg` | User-provided asset (not committed) |

---

## Out of Scope

- No JS required — entire hover effect is pure CSS
- No changes to existing `Reveal`, `LiveClock`, or any other component
- No mobile-specific behaviour changes (card is narrow enough to fit at all breakpoints)
