# Backlog

## Ready

### Migration (App Router)

- [ ] migrate: static/presentational components to Server Components (layout shells, buttons, badges — no data-fetching, no browser APIs)
- [ ] migrate: barcode scanner component to Client Component (`'use client'`, uses device/browser APIs)
- [ ] migrate: real-time "who has this checked out" view to Client Component
- [ ] migrate: routing — convert React Router routes to `app/` folder structure (page.tsx per route, layout.tsx for shared shells)
- [ ] migrate: hostbase.js config to `.env.local`, replace hardcoded backend URL, add `NEXT_PUBLIC_` prefix where read client-side
- [ ] migrate: data-fetching — decide per-component: Server Component fetch vs. client-side fetch for real-time behavior
- [ ] migrate: remaining hooks/contexts, add types for API response shapes as encountered

### Cleanup

- [ ] fix: `blockedUsers` assigned but never used in Dashboard.jsx (eslint no-unused-vars)
- [ ] chore: replace placeholder `hostbase.js` value with real backend URL/env var once decided
- [ ] chore: remove CRA leftovers once migration complete (react-scripts, public/index.html conventions) — do this last, not now

## Done

- [x] fix: CRA/Next.js toolchain collision, moved app/ out of src/ (2026-09-03)
- [x] fix: missing hostbase.js blocking compilation (2026-09-03)
