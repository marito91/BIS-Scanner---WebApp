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
- [ ] migrate: Spinner, Settings, dashboard/BlockStudents, dashboard/ManageIds, textbooks/txtbooks.js to Server Components (no client deps)
- [ ] refactor: Restricted.jsx — swap react-router-dom Link → next/link, then qualifies as Server Component (do during routing migration, Day 4)
- [ ] chore: confirm books/collection/Pagination.jsx is unused, remove if so
- [ ] investigate: Barcode integration in devices/Rent.jsx is currently
      disabled and broken (handleCode referenced but not defined,
      call is commented out). Confirm if scanning works via a
      different path, or if this needs to be rebuilt when Rent.jsx migrates.
- [ ] decide: Barcode.jsx/react-barcode-reader was an alternate,
      unfinished approach to scanning (likely camera-based), superseded
      by the working keyboard-emulation input in Rent.jsx (physical
      scanners type directly into user.document). handleCode was
      never implemented. Decide during cleanup: delete entirely, or
      keep as scaffolding for a future camera-scan feature.

### Cleanup

- [ ] fix: `blockedUsers` assigned but never used in Dashboard.jsx (eslint no-unused-vars)
- [ ] chore: replace placeholder `hostbase.js` value with real backend URL/env var once decided
- [ ] chore: remove CRA leftovers once migration complete (react-scripts, public/index.html conventions) — do this last, not now

## Done

- [x] fix: CRA/Next.js toolchain collision, moved app/ out of src/ (2026-09-03)
- [x] fix: missing hostbase.js blocking compilation (2026-09-03)
