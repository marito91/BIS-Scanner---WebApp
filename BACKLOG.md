# Backlog

## Ready

### Migration (App Router)

- [ ] migrate: routing — build page.tsx for /home, /books, /textbooks, /settings (app shell, landing page, Login, and /devices are done, see Done). Protected routes are already gated by proxy.ts, so page components don't need their own auth check.
- [ ] migrate: data-fetching — decide per-component: Server Component fetch vs. client-side fetch for real-time behavior
- [ ] migrate: remaining hooks/contexts, add types for API response shapes as encountered
- [ ] harden: proxy.ts matcher (`/home`, `/devices`, `/books`, `/textbooks`, `/settings`) is exact-match only, doesn't cover future sub-routes automatically
- [ ] chore: allow LAN dev access for mobile testing — add device IP(s) to `allowedDevOrigins` in next.config.ts (personal dev config, not part of any migration PR)
- [ ] chore: confirm books/collection/Pagination.jsx is unused, remove if so
- [ ] note: Devices.tsx (migrated) currently imports Actives, Rent, User, Calculators from their old src/components/devices/ location via a relative cross-tree path. Update each import as its target migrates; remove this note once all 4 are moved.
- [ ] chore: src/App.js has a dangling import of the now-deleted Textbooks.jsx (and likely accumulates more of these as migration continues) — harmless since App.js isn't part of the App Router build/tsconfig, but should be deleted outright once the CRA leftovers cleanup item runs

### Cleanup

- [ ] fix: `blockedUsers` assigned but never used in Dashboard.jsx (eslint no-unused-vars)
- [ ] chore: replace placeholder `hostbase.js` value with real backend URL/env var once decided
- [ ] chore: remove CRA leftovers once migration complete (react-scripts, public/index.html conventions) — do this last, not now
- [ ] fix: Devices.tsx returnDevice/returnCalc - state resets and updateRented() run even when window.confirm is cancelled, only the server POST is actually gated. Confirm should wrap the whole block, not just the fetch. Separate fix, not part of migration.
- [ ] harden: Devices.tsx error handling — catch (error: any) in loadDataAndDownload and the 3 promise .catch(e) sites all use any/implicit any. Tighten to unknown + instanceof Error where it doesn't change existing behavior (note: bare non-Error throws currently interpolate as "undefined" in the message, preserve that if narrowing later). Separate from migration.
- [ ] cleanup: `user`/`setUser` state in `components/Devices.tsx` appears fully dead — reset to blank in `returnDevice`/`returnCalc`, but never read there or by any child. Confirm and remove if so.
- [ ] cleanup: `src/hostbase.js` can be deleted once every remaining `hostbase.js` import in the still-unmigrated `src/` files is gone (all live/reachable files now read `process.env.NEXT_PUBLIC_HOSTBASE_URL` directly).
- [ ] cleanup: `ManageBooks.jsx` independently decodes its own JWT via `localStorage`/`jwt-decode`, redundant with the `admin` prop `NewBooks.tsx` already passes it. Resolve when `ManageBooks.jsx` migrates — likely means dropping the local decode and using the prop instead.

### Future features

- [ ] feature: blocked-students dashboard widget — the old `src/components/Dashboard.jsx` had a working fetch (`GET /users/blocked_users`) and a partially-built but commented-out UI for it, dropped during the `/home` migration rather than resurrected as-is. If rebuilt, it should be an async Server Component fetch (or a route-level data function), not the old client `useEffect` pattern.

### Broken icon in login modal (Index.tsx)

The small icon next to "We are sorry..." in the restricted-access login modal
renders as a broken image (missing/incorrect image reference). Pre-existing,
unrelated to any recent migration PR. Cosmetic only, doesn't block login
functionality. Needs the image asset path checked in Index.tsx.

## Done

- [x] fix: CRA/Next.js toolchain collision, moved app/ out of src/ (2026-09-03)
- [x] fix: missing hostbase.js blocking compilation (2026-09-03)
- [x] migrate: Spinner, Settings, dashboard/BlockStudents, dashboard/ManageIds, textbooks/txtbooks.js to Server Components (2026-09-04)
- [x] migrate: Barcode component to TypeScript Client Component, unused/isolated (2026-09-04) — later deleted entirely 2026-09-15 (no camera-scan feature planned; scanning uses keyboard-emulation into input fields)
- [x] migrate: Devices.jsx to Devices.tsx as Client Component, real-time checkout view (2026-09-07)
- [x] migrate: auth architecture from localStorage/client-decoded JWT to Next.js BFF pattern — app/api/auth/login+logout route handlers proxy to hostbase and set/clear an httpOnly cookie, proxy.ts gates protected routes by cookie presence, lib/auth.ts for Server Components needing user info. No hostbase changes required; confirmed no other call site sends the token as a bearer header, so scope stayed limited to login/logout. (2026-09-08)
- [x] migrate: app shell, landing page, and Login to App Router — app/page.tsx, components/Index.tsx (modal toggle preserved, not dropped, see PR notes), components/Login.tsx (BFF-aware, no more localStorage), components/Menu.tsx/HamburgerMenu.tsx/Footer.tsx, app/(protected)/layout.tsx. Resolved Restricted.jsx's role: proxy.ts redirects to /?restricted=true, message renders inside Login's .center card with the original forbid.svg icon. Found and fixed 3 small bugs along the way (submit input casing, missing close icon, missing .catch() on login()), all in files new to this PR. (2026-09-09)
- [x] migrate: app-state foundation — lib/useSocket.ts (typed port of the old useSocket hook) and components/AppStateProvider.tsx, the new shared home for `socket` and `showNotification` now that there's no single root component in the App Router structure (src/App.js used to own both and pass them down as props). Wired into app/(protected)/layout.tsx. `user`/`setUser` deliberately excluded — only ever consumed by Devices.tsx, not shared across routes, stays local when Devices is wired in (2026-09-10)
- [x] migrate: /devices to App Router — app/(protected)/devices/page.tsx (Server Component, calls getSessionUser(), redirects to /?restricted=true on null since proxy.ts only checks cookie presence, not that it decodes validly). components/Devices.tsx now takes `loggedUser: SessionUser` as a prop instead of self-decoding a localStorage token, and reads `socket`/`showNotification` from useAppState() instead of props; `user`/`setUser` is now local `useState` in Devices.tsx, unchanged at both call sites (2026-09-11)
- [x] migrate: hostbase.js config to `.env.local`/`NEXT_PUBLIC_HOSTBASE_URL` — single env var for both server and client (confirmed with Mario: no server/client split needed, URL isn't a secret). Wired into app/api/auth/login/route.ts (placeholder TODO removed) and every live client call site: components/Login.tsx, AppStateProvider.tsx, Devices.tsx, and src/components/devices/Actives.jsx, Rent.jsx, User.jsx (cross-imported into Devices.tsx). Added `.env.example` documenting the var; `.env.local` set to the same value the old hostbase.js had (http://localhost:5000) so local dev is unaffected. `src/hostbase.js` left in place for the still-unmigrated files that still import it (2026-09-11)
- [x] cleanup: removed dead components — Restricted.jsx, dashboard/BlockStudents.jsx (+.tsx stub), dashboard/ManageIds.jsx (+.tsx stub), Barcode.tsx, plus dead commented-out Barcode usage in Rent.jsx (2026-09-15)
