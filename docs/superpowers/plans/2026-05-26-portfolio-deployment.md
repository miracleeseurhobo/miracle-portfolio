# Portfolio Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the portfolio monorepo to Vercel as a static SPA (React/Vite) with a single serverless function at `/api/healthz`.

**Architecture:** The Vite portfolio build outputs to `artifacts/portfolio/dist/public/` and is served as static files by Vercel. API routes live in an `api/` folder at the repo root as Vercel Serverless Functions (TypeScript, `@vercel/node`). A SPA rewrite rule in `vercel.json` sends all non-API paths to `index.html` so `wouter` handles client-side routing.

**Tech Stack:** React 19, Vite 7, TailwindCSS 4, pnpm workspaces, TypeScript 5.9, `@vercel/node`, Vercel CLI (dashboard deploy)

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Modify | `pnpm-workspace.yaml` | Remove macOS-only binary overrides so Vercel's Linux runners can install esbuild/rollup/lightningcss |
| Modify | `artifacts/portfolio/index.html` | Add `og:image` and `twitter:image` meta tags |
| Modify | `artifacts/portfolio/src/App.tsx` | Replace Calendly placeholder with real booking URL |
| Modify | `package.json` (root) | Add `@vercel/node` as devDependency |
| Create | `api/tsconfig.json` | TypeScript config for the `api/` serverless folder |
| Create | `api/healthz.ts` | Vercel serverless function — `GET /api/healthz` |
| Create | `vercel.json` | Vercel build + routing config |

---

## Task 1: Remove platform-specific binary overrides from pnpm-workspace.yaml

**Files:**
- Modify: `pnpm-workspace.yaml`

The current `overrides` block excludes all Linux/Windows/FreeBSD native binaries (esbuild, rollup, lightningcss, @tailwindcss/oxide, @expo/ngrok-bin) to slim down the local macOS install. Vercel runs on Linux and cannot install esbuild without the linux-x64 binary — the build will fail with a missing binary error.

The fix: delete all the `"package>@sub-package/platform": "-"` override lines. Keep only the two functional overrides at the bottom of the block.

- [ ] **Step 1: Replace the entire `overrides` and `allowBuilds` section**

Open `pnpm-workspace.yaml`. Find the line `overrides:` (near the bottom). Replace everything from `overrides:` to the end of the file with:

```yaml
overrides:
  # drizzle-kit uses esbuild internally on an older version that's vulnerable, this overrides it
  "@esbuild-kit/esm-loader": "npm:tsx@^4.21.0"
  esbuild: "0.27.3"

allowBuilds:
  esbuild: true
```

- [ ] **Step 2: Verify the file ends correctly**

Run:
```bash
tail -10 pnpm-workspace.yaml
```
Expected output:
```
overrides:
  # drizzle-kit uses esbuild internally on an older version that's vulnerable, this overrides it
  "@esbuild-kit/esm-loader": "npm:tsx@^4.21.0"
  esbuild: "0.27.3"

allowBuilds:
  esbuild: true
```

- [ ] **Step 3: Re-install to validate no broken overrides**

```bash
pnpm install
```
Expected: No errors. You may see pnpm downloading additional binaries (linux builds of esbuild etc.) — that's correct, they're no longer excluded.

- [ ] **Step 4: Commit**

```bash
git add pnpm-workspace.yaml pnpm-lock.yaml
git commit -m "fix: remove macOS-only binary overrides to unblock Vercel Linux build"
```

---

## Task 2: Add og:image and twitter:image meta tags to index.html

**Files:**
- Modify: `artifacts/portfolio/index.html`

The `opengraph.jpg` image already exists in `artifacts/portfolio/public/`. The meta tags are missing the `og:image` and `twitter:image` entries, so link previews on Twitter/LinkedIn show no image.

- [ ] **Step 1: Add the two missing meta tags**

Open `artifacts/portfolio/index.html`. After the line:
```html
<meta name="twitter:description" content="Miracle Eseurhobo — UX Designer and Framer Developer helping startups launch polished, conversion-ready products." />
```

Add these two lines immediately below it:
```html
<meta property="og:image" content="https://YOUR_VERCEL_DOMAIN/opengraph.jpg" />
<meta name="twitter:image" content="https://YOUR_VERCEL_DOMAIN/opengraph.jpg" />
```

> **Note:** Replace `YOUR_VERCEL_DOMAIN` with your actual Vercel domain (e.g. `my-portfolio.vercel.app`). You will know this after the first deploy in Task 10. It is fine to commit the placeholder now and update it in a follow-up commit after deployment.

- [ ] **Step 2: Verify the head block looks correct**

Run:
```bash
grep -n "og:image\|twitter:image\|twitter:card" artifacts/portfolio/index.html
```
Expected:
```
8:    <meta name="twitter:card" content="summary_large_image" />
12:    <meta property="og:image" content="https://YOUR_VERCEL_DOMAIN/opengraph.jpg" />
13:    <meta name="twitter:image" content="https://YOUR_VERCEL_DOMAIN/opengraph.jpg" />
```

- [ ] **Step 3: Commit**

```bash
git add artifacts/portfolio/index.html
git commit -m "feat: add og:image and twitter:image meta tags for social previews"
```

---

## Task 3: Fix the Calendly placeholder link

**Files:**
- Modify: `artifacts/portfolio/src/App.tsx`

The "Coffee chat" button currently links to `https://calendly.com/` — the Calendly homepage, not your booking page. Anyone clicking it on the live site lands on a generic page.

- [ ] **Step 1: Replace the placeholder href**

Open `artifacts/portfolio/src/App.tsx`. Find line 142:
```tsx
href="https://calendly.com/"
```

Replace it with your personal Calendly booking URL:
```tsx
href="https://calendly.com/miracleeseurhobo"
```

> **Note:** Adjust the path to match your actual Calendly username/event slug (e.g. `https://calendly.com/miracleeseurhobo/30min`). Log in to calendly.com to confirm your booking page URL.

- [ ] **Step 2: Verify the change**

```bash
grep -n "calendly" artifacts/portfolio/src/App.tsx
```
Expected: Both lines show your real URL, not `https://calendly.com/`.

- [ ] **Step 3: Commit**

```bash
git add artifacts/portfolio/src/App.tsx
git commit -m "fix: replace Calendly placeholder with real booking URL"
```

---

## Task 4: Add @vercel/node devDependency at workspace root

**Files:**
- Modify: `package.json` (repo root)

`@vercel/node` provides the `VercelRequest` and `VercelResponse` TypeScript types used in `api/healthz.ts`. Since `api/` is not a workspace package, install it at the monorepo root.

- [ ] **Step 1: Add the dependency**

```bash
pnpm add -wD @vercel/node
```

Expected output ends with something like:
```
+ @vercel/node 5.x.x
```

- [ ] **Step 2: Verify it appears in root package.json**

```bash
grep -A2 '"devDependencies"' package.json
```
Expected: `@vercel/node` is listed alongside `prettier` and `typescript`.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add @vercel/node types for serverless function typechecking"
```

---

## Task 5: Create api/tsconfig.json

**Files:**
- Create: `api/tsconfig.json`

This config gives the IDE and `tsc` type-awareness over the `api/` folder. Vercel compiles serverless functions natively at deploy time, so this is for local type safety only.

- [ ] **Step 1: Create the file**

Create `api/tsconfig.json` at the repo root with this exact content:

```json
{
  "extends": "../tsconfig.base.json",
  "include": ["./**/*"],
  "compilerOptions": {
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "lib": ["es2022"],
    "types": ["node"]
  }
}
```

- [ ] **Step 2: Verify it resolves the base config**

```bash
cd api && npx tsc --noEmit 2>&1 | head -5
```
Expected: Either no output (clean) or only errors about `healthz.ts` not existing yet — not errors about the config itself.

```bash
cd ..
```

- [ ] **Step 3: Commit**

```bash
git add api/tsconfig.json
git commit -m "chore: add tsconfig for api/ serverless functions folder"
```

---

## Task 6: Create api/healthz.ts serverless function

**Files:**
- Create: `api/healthz.ts`

This replaces `artifacts/api-server/src/routes/health.ts` as a Vercel Serverless Function. Vercel maps `api/healthz.ts` → `GET /api/healthz` automatically.

- [ ] **Step 1: Create the file**

Create `api/healthz.ts` at the repo root with this exact content:

```ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.json({ status: "ok" });
}
```

- [ ] **Step 2: Typecheck the file**

```bash
cd api && npx tsc --noEmit
```
Expected: No output (clean typecheck).

```bash
cd ..
```

- [ ] **Step 3: Commit**

```bash
git add api/healthz.ts
git commit -m "feat: add /api/healthz serverless function"
```

---

## Task 7: Create vercel.json

**Files:**
- Create: `vercel.json`

This tells Vercel: how to build the portfolio, where the output lives, and how to route requests. The two rewrites are critical — the first ensures `/api/*` hits the serverless functions; the second is the SPA fallback that lets `wouter` handle client-side routes like `/case-study/:slug` without 404s.

- [ ] **Step 1: Create the file**

Create `vercel.json` at the repo root with this exact content:

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

- [ ] **Step 2: Validate it is valid JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('vercel.json','utf8')); console.log('valid JSON')"
```
Expected:
```
valid JSON
```

- [ ] **Step 3: Commit**

```bash
git add vercel.json
git commit -m "feat: add vercel.json with build config and SPA rewrite rules"
```

---

## Task 8: Local build verification

**Files:** None created — verification only.

Before pushing to Vercel, confirm the full build chain passes locally. This catches typecheck errors and Vite build failures before they fail in CI.

- [ ] **Step 1: Run pnpm install to confirm no install errors**

```bash
pnpm install
```
Expected: Completes with no errors. If you see `ERR_PNPM_UNSUPPORTED_PLATFORM` or similar binary errors, Task 1 was not applied correctly — revisit it.

- [ ] **Step 2: Run the full typecheck**

```bash
pnpm run typecheck
```
Expected:
```
(no error output)
```
If you see TypeScript errors, fix them before continuing.

- [ ] **Step 3: Run the full build**

```bash
pnpm run build
```
Expected: Ends with a Vite build summary showing output files in `artifacts/portfolio/dist/public/`. Example:
```
✓ built in Xs
dist/public/index.html          x.xx kB
dist/public/assets/index-xxx.js  xxx kB
```

- [ ] **Step 4: Spot-check the build output**

```bash
ls artifacts/portfolio/dist/public/
```
Expected to contain at minimum:
```
index.html   assets/   favicon.svg   media/   logos/   opengraph.jpg   robots.txt   miracle-eseurhobo-cv.pdf
```

If `media/` or `logos/` are missing, the public directory wasn't copied — re-run `pnpm --filter @workspace/portfolio run build` and check for Vite warnings.

- [ ] **Step 5: Commit any fixes, then push to GitHub**

```bash
git push origin main
```
Expected: Push succeeds.

---

## Task 9: Vercel project setup (dashboard, one-time)

No files changed — Vercel dashboard configuration.

- [ ] **Step 1: Create a new Vercel project**

Go to [vercel.com/new](https://vercel.com/new). Click **Import Git Repository**. Select the `My-Portfolio` GitHub repo.

- [ ] **Step 2: Configure the project settings**

On the "Configure Project" screen, set these values exactly:

| Field | Value |
|-------|-------|
| Framework Preset | **Other** |
| Root Directory | `.` (leave blank / dot) |
| Build Command | `pnpm --filter @workspace/portfolio run build` |
| Output Directory | `artifacts/portfolio/dist/public` |
| Install Command | `pnpm install` |
| Node.js Version | `22.x` (in project Settings → General) |

> `vercel.json` also provides `buildCommand`, `outputDirectory`, and `installCommand` — the dashboard overrides take precedence if set, so make sure they match exactly or clear the dashboard fields to let `vercel.json` control them.

- [ ] **Step 3: Add no environment variables for now**

The portfolio doesn't use a database or any secrets yet. Click **Deploy**.

- [ ] **Step 4: Wait for the first deploy to complete**

Expected: Green "Deployment successful" banner. Vercel assigns a URL like `my-portfolio-abc123.vercel.app`.

Note this URL — you'll need it in the next task and to update the `og:image` meta tag.

---

## Task 10: Post-deployment verification

No files changed — verification against the live URL.

Replace `<DOMAIN>` with your actual Vercel URL throughout these steps.

- [ ] **Step 1: Confirm the home page loads**

Open `https://<DOMAIN>` in a browser.
Expected: Portfolio home page renders with header, portfolio grid, experience section. No blank screen, no JS errors in the browser console.

- [ ] **Step 2: Confirm SPA routing works (no 404 on direct navigation)**

Navigate directly to: `https://<DOMAIN>/case-study/ui-facelift-ux-enhancement`
Expected: Case study page loads (not a 404).

If you get a 404, the SPA rewrite rule in `vercel.json` is not being applied — double-check that the `rewrites` array is present and valid JSON.

- [ ] **Step 3: Confirm the health check endpoint responds**

```bash
curl -s https://<DOMAIN>/api/healthz
```
Expected:
```json
{"status":"ok"}
```

If you get a 404 or HTML error page, the `api/healthz.ts` function was not found. Check that the file is at the repo root (`api/healthz.ts`, not inside `artifacts/`).

- [ ] **Step 4: Validate OG preview**

Go to [opengraph.xyz](https://www.opengraph.xyz), enter `https://<DOMAIN>`, and click **Check**.
Expected: Your name/description appears as the preview title and description. The `opengraph.jpg` image appears in the preview card.

If the image is missing, update the `og:image` and `twitter:image` tags in `artifacts/portfolio/index.html` to use the real `<DOMAIN>`, commit, and push — Vercel will redeploy automatically.

- [ ] **Step 5: Test on mobile**

Open `https://<DOMAIN>` on a real mobile device (or Chrome DevTools → Toggle device toolbar → iPhone 14).
Expected: Left column stacks above the portfolio grid; all text is readable; no horizontal overflow.

- [ ] **Step 6: Update og:image with real domain (if you used a placeholder)**

If Task 2 used `YOUR_VERCEL_DOMAIN` as a placeholder, now replace it:

In `artifacts/portfolio/index.html`, change:
```html
<meta property="og:image" content="https://YOUR_VERCEL_DOMAIN/opengraph.jpg" />
<meta name="twitter:image" content="https://YOUR_VERCEL_DOMAIN/opengraph.jpg" />
```
to:
```html
<meta property="og:image" content="https://<DOMAIN>/opengraph.jpg" />
<meta name="twitter:image" content="https://<DOMAIN>/opengraph.jpg" />
```

Then commit and push:
```bash
git add artifacts/portfolio/index.html
git commit -m "fix: update og:image with real Vercel domain"
git push origin main
```

Expected: Vercel auto-deploys within ~30 seconds.

---

## Success Checklist

- [ ] `pnpm run build` passes cleanly with no TypeScript or Vite errors
- [ ] Home page loads at the Vercel URL with all media (videos, images, logos)
- [ ] `/case-study/ui-facelift-ux-enhancement` loads without a 404
- [ ] `/api/healthz` returns `{"status":"ok"}`
- [ ] OG image appears when the URL is pasted into [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Mobile layout renders correctly (no overflow, readable text)
- [ ] Coffee chat button links to a real Calendly booking page
