# Portfolio Deployment Design

**Date:** 2026-05-26  
**Author:** Miracle Eseurhobo  
**Status:** Approved  

---

## Overview

Deploy the `My-Portfolio` monorepo to production using **Vercel** for both the static frontend and backend API routes. The portfolio frontend (React 19 + Vite SPA) is hosted as static files. The Express API server is replaced by **Vercel Serverless Functions** (`api/` directory at the repo root), keeping all infrastructure in a single Vercel project.

---

## Architecture

```
GitHub (main branch)
        │
        ▼
   Vercel Project
   ┌─────────────────────────────┐
   │  Build: pnpm --filter       │
   │    @workspace/portfolio     │
   │    run build                │
   │                             │
   │  Static output:             │
   │    artifacts/portfolio/     │
   │    dist/public/             │
   │                             │
   │  Serverless functions:      │
   │    api/healthz.ts  →        │
   │    GET /api/healthz         │
   │                             │
   │  SPA fallback rewrite:      │
   │    /* → /index.html         │
   └─────────────────────────────┘
```

**What is NOT deployed:**
- `artifacts/api-server` — replaced by serverless functions; the Express server is local/dev-only going forward
- `artifacts/mockup-sandbox` — dev tool only, never deployed
- `lib/db` — no database wired up yet; omitted from this deployment

---

## Pre-flight Fixes

These issues exist in the repo today and must be resolved before deployment.

### 1. esbuild platform overrides (blocking)
**File:** `pnpm-workspace.yaml`  
**Problem:** The `overrides` block excludes all non-macOS esbuild/rollup/lightningcss binaries. Vercel runs on Linux — it cannot install esbuild without the linux-x64 binary.  
**Fix:** Remove the platform-specific `"-"` overrides from `pnpm-workspace.yaml`, or scope them to a local-only config. Keep only what is actually required for reproducible installs.

### 2. Missing og:image URL (non-blocking but important for SEO/sharing)
**File:** `artifacts/portfolio/index.html`  
**Problem:** `<meta property="og:image">` tag is absent. The file `public/opengraph.jpg` exists and is ready.  
**Fix:** Add the tag with the full absolute production URL:
```html
<meta property="og:image" content="https://<your-domain>/opengraph.jpg" />
<meta name="twitter:image" content="https://<your-domain>/opengraph.jpg" />
```

### 3. Calendly placeholder link (non-blocking but embarrassing live)
**File:** `artifacts/portfolio/src/App.tsx`  
**Problem:** The "Coffee chat" button links to `https://calendly.com/` — the generic Calendly homepage, not a booking page.  
**Fix:** Replace with your personal Calendly URL (e.g. `https://calendly.com/miracleeseurhobo/30min`).

### 4. PORT requirement in api-server (low risk, clean-up)
**File:** `artifacts/api-server/src/index.ts`  
**Problem:** The server throws if `PORT` is not set. With Option A (serverless functions), this file is no longer in the deployment path, but it still participates in `pnpm run typecheck`. No change strictly required, but worth noting.

---

## New Files to Create

### `vercel.json` (repo root)
Controls how Vercel builds and routes the project.

```json
{
  "buildCommand": "pnpm --filter @workspace/portfolio run build",
  "outputDirectory": "artifacts/portfolio/dist/public",
  "installCommand": "pnpm install",
  "framework": null,
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

The second rewrite is the SPA fallback: any URL that doesn't start with `/api/` is served `index.html`, letting `wouter` handle client-side routing. Without it, direct navigation to `/case-study/ui-facelift-ux-enhancement` returns a 404.

### `api/healthz.ts` (repo root)
Replaces `artifacts/api-server/src/routes/health.ts` as a Vercel serverless function.

```ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.json({ status: "ok" });
}
```

Install the type dependency:
```
pnpm add -D @vercel/node --filter @workspace/portfolio
```
Or add it at the workspace root since the `api/` folder is not a workspace package.

### Root `tsconfig.json` update
Add `"api"` to `include` so the new serverless function is covered by workspace typechecks:
```json
{
  "include": ["api", ...]
}
```

---

## Vercel Dashboard Setup (one-time)

| Setting | Value |
|---------|-------|
| Repository | `My-Portfolio` (GitHub) |
| Root Directory | `.` (repo root) |
| Build Command | `pnpm --filter @workspace/portfolio run build` |
| Output Directory | `artifacts/portfolio/dist/public` |
| Install Command | `pnpm install` |
| Node.js Version | `22.x` |
| Environment Variables | None required for initial deploy |

---

## Deployment Steps

### Phase 1 — Repo changes
1. Remove platform-specific binary overrides from `pnpm-workspace.yaml`
2. Add `og:image` and `twitter:image` meta tags to `artifacts/portfolio/index.html`
3. Replace Calendly placeholder with real booking URL in `artifacts/portfolio/src/App.tsx`
4. Create `vercel.json` at repo root
5. Create `api/healthz.ts` at repo root
6. Add `@vercel/node` as a dev dependency (root or portfolio package)
7. Update root `tsconfig.json` to include `"api"` in `include`
8. Run `pnpm install` — confirm no errors
9. Run `pnpm run build` — must pass (typecheck + Vite build)
10. Run `pnpm run typecheck` — must pass with zero errors
11. Commit all changes to `main` and push to GitHub

### Phase 2 — Vercel project setup
12. Create new Vercel project → Import from GitHub
13. Apply the dashboard settings from the table above
14. Trigger first deploy

### Phase 3 — Post-deployment verification
15. Visit live URL — confirm home page loads correctly
16. Navigate to `/case-study/ui-facelift-ux-enhancement` — confirm no 404
17. Hit `<domain>/api/healthz` — must return `{"status":"ok"}`
18. Validate OG preview at [opengraph.xyz](https://www.opengraph.xyz)
19. Test on a real mobile device or browser devtools mobile viewport
20. (Optional) Add custom domain in Vercel dashboard
21. (Optional) Enable Vercel Analytics

---

## Success Criteria

- [ ] `pnpm run build` passes cleanly on a fresh install (no platform-specific binary errors)
- [ ] Home page loads at the Vercel URL with all media (videos, images, logos)
- [ ] `/case-study/ui-facelift-ux-enhancement` loads without a 404
- [ ] `/api/healthz` returns `{"status":"ok"}`
- [ ] OG image appears when the URL is shared on Twitter/LinkedIn
- [ ] Mobile layout renders correctly
- [ ] Coffee chat button links to a real Calendly booking page

---

## Out of Scope

- Database setup (`DATABASE_URL`, Drizzle migrations) — no DB is used in the current portfolio
- Authentication or protected routes
- CI/CD pipeline beyond Vercel's built-in Git integration
- The `mockup-sandbox` and `api-server` artifacts (not deployed)
