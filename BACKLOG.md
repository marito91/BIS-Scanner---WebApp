# Backlog

## Ready

### Migration (App Router)

- [ ] migrate: routing — build page.tsx for /home, /devices, /books, /textbooks, /settings (app shell, landing page, and Login are done, see Done). Protected routes are already gated by proxy.ts, so page components don't need their own auth check. Start with /devices, since components/Devices.tsx is already migrated and just needs loggedUser wired in (see next item)
- [ ] migrate: wire components/Devices.tsx to receive `loggedUser` from lib/auth.ts via its parent Server Component (app/devices/page.tsx) instead of self-decoding — its token read no longer works now that the cookie is httpOnly. Also replace its `token`/`jwtDecode` block with the `useAppState()` hook for `socket`/`showNotification` (from AppStateProvider, see Done); `user`/`setUser` stays local `useState` inside Devices.tsx, it's not part of that shared provider
- [ ] migrate: hostbase.js config to `.env.local`, replace hardcoded backend URL, add `NEXT_PUBLIC_` prefix where read client-side (confirmed blocking: login currently 500s locally with "Invalid URL" since HOSTBASE is unset, 2026-09-09)
- [ ] migrate: data-fetching — decide per-component: Server Component fetch vs. client-side fetch for real-time behavior
- [ ] migrate: remaining hooks/contexts, add types for API response shapes as encountered
- [ ] harden: proxy.ts matcher (`/home`, `/devices`, `/books`, `/textbooks`, `/settings`) is exact-match only, doesn't cover future sub-routes automatically
- [ ] chore: allow LAN dev access for mobile testing — add device IP(s) to `allowedDevOrigins` in next.config.ts (personal dev config, not part of any migration PR)
- [ ] chore: confirm books/collection/Pagination.jsx is unused, remove if so
- [ ] investigate: Barcode integration in devices/Rent.jsx is currently disabled and broken (handleCode referenced but not defined, call is commented out). Confirm if scanning works via a different path, or if this needs to be rebuilt when Rent.jsx migrates.
- [ ] decide: Barcode.jsx/react-barcode-reader was an alternate, unfinished approach to scanning (likely camera-based), superseded by the working keyboard-emulation input in Rent.jsx (physical scanners type directly into user.document). handleCode was never implemented. Decide during cleanup: delete entirely, or keep as scaffolding for a future camera-scan feature.
- [ ] note: Devices.tsx (migrated) currently imports Actives, Rent, User, Calculators from their old src/components/devices/ location via a relative cross-tree path. Update each import as its target migrates; remove this note once all 4 are moved.

### Cleanup

- [ ] fix: `blockedUsers` assigned but never used in Dashboard.jsx (eslint no-unused-vars)
- [ ] chore: replace placeholder `hostbase.js` value with real backend URL/env var once decided
- [ ] chore: remove CRA leftovers once migration complete (react-scripts, public/index.html conventions) — do this last, not now
- [ ] fix: Devices.tsx returnDevice/returnCalc - state resets and updateRented() run even when window.confirm is cancelled, only the server POST is actually gated. Confirm should wrap the whole block, not just the fetch. Separate fix, not part of migration.
- [ ] harden: Devices.tsx error handling — catch (error: any) in loadDataAndDownload and the 3 promise .catch(e) sites all use any/implicit any. Tighten to unknown + instanceof Error where it doesn't change existing behavior (note: bare non-Error throws currently interpolate as "undefined" in the message, preserve that if narrowing later). Separate from migration.

## Done

- [x] fix: CRA/Next.js toolchain collision, moved app/ out of src/ (2026-09-03)
- [x] fix: missing hostbase.js blocking compilation (2026-09-03)
- [x] migrate: Spinner, Settings, dashboard/BlockStudents, dashboard/ManageIds, textbooks/txtbooks.js to Server Components (2026-09-04)
- [x] migrate: Barcode component to TypeScript Client Component, unused/isolated (2026-09-04)
- [x] migrate: Devices.jsx to Devices.tsx as Client Component, real-time checkout view (2026-09-07)
- [x] migrate: auth architecture from localStorage/client-decoded JWT to Next.js BFF pattern — app/api/auth/login+logout route handlers proxy to hostbase and set/clear an httpOnly cookie, proxy.ts gates protected routes by cookie presence, lib/auth.ts for Server Components needing user info. No hostbase changes required; confirmed no other call site sends the token as a bearer header, so scope stayed limited to login/logout. (2026-09-08)
- [x] migrate: app shell, landing page, and Login to App Router — app/page.tsx, components/Index.tsx (modal toggle preserved, not dropped, see PR notes), components/Login.tsx (BFF-aware, no more localStorage), components/Menu.tsx/HamburgerMenu.tsx/Footer.tsx, app/(protected)/layout.tsx. Resolved Restricted.jsx's role: proxy.ts redirects to /?restricted=true, message renders inside Login's .center card with the original forbid.svg icon. Found and fixed 3 small bugs along the way (submit input casing, missing close icon, missing .catch() on login()), all in files new to this PR. (2026-09-09)
- [x] migrate: app-state foundation — lib/useSocket.ts (typed port of the old useSocket hook) and components/AppStateProvider.tsx, the new shared home for `socket` and `showNotification` now that there's no single root component in the App Router structure (src/App.js used to own both and pass them down as props). Wired into app/(protected)/layout.tsx. `user`/`setUser` deliberately excluded — only ever consumed by Devices.tsx, not shared across routes, stays local when Devices is wired in (2026-09-10)
