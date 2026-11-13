# Auto-Damm website

One-page website for Auto Damm (Frankenberg/Sa.): car parts, accessories and end-of-life vehicle recycling.
Built with Angular (standalone components, signals, zoneless change detection). German only, light and dark mode.

## Run

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/auto-damm
```

Requires Node 22.22.3+ or 24.15+ (CI uses the version in `.nvmrc`).

## Contributing

`main` is protected: every change goes through a pull request, and the PR can only be merged when all CI checks pass.

1. Create a branch, commit, open a PR into `main`.
2. Name the PR with a [Conventional Commit](https://www.conventionalcommits.org) prefix, e.g. `feat: add opening hours banner`,
   `fix: …`, `chore: …`, `docs: …`. PRs are squash-merged, so the title becomes the commit message.
3. Run `npm run ci` locally before pushing; it runs the same checks as GitHub.

| Check       | Command                                   | What it enforces                                                            |
| ----------- | ----------------------------------------- | --------------------------------------------------------------------------- |
| `lint`      | `npm run lint` + `npm run format:check`   | ESLint (TypeScript strict, Angular, accessibility, layer rules), Prettier   |
| `typecheck` | `npm run typecheck`                       | App and test code compile under `strict`                                    |
| `test`      | `npm run test:coverage`                   | Vitest unit tests; fails below 80% lines/statements/functions, 70% branches |
| `build`     | `npm run build`                           | Production build, bundle size budgets                                       |
| `security`  | `npm audit --omit=dev --audit-level=high` | No known high/critical vulnerabilities in shipped dependencies              |
| `pr-title`  | –                                         | Conventional Commit PR title                                                |

CodeQL scans for security issues on every PR, and Dependabot opens weekly update PRs.

Useful while working: `npm test` (unit tests), `npm run lint:fix` and `npm run format` (auto-fix).

### Layer rules

ESLint fails the build when an import crosses a layer boundary (see `eslint.config.mjs`):

- `core/models`, `core/use-cases`: only models, and no Angular or RxJS (pure domain code).
- `core/ports`, `core/content`: only models.
- `core/adapters`: models, ports, content. Only `core/core.providers.ts` may import adapters.
- `core/state`: models, ports, use cases, other stores.
- `shared`: models, ports, state, shared. Never features or layout.
- `features/<name>`, `layout/<name>`: models, ports, state, shared, and files of their own folder. Never another feature.
- Across layers, import through the `@core`, `@shared`, `@features`, `@layout` aliases, not `../`.

## Architecture

The code is organised by feature, following the Angular style guide. App-wide logic lives in `core/`, where ports
(abstract classes) are bound to adapters, so components never depend on storage, the clock or the browser directly.

```
src/app/
├── core/                   App-wide singletons; no UI
│   ├── models/             Theme, OpeningSchedule, BusinessProfile, SiteContent
│   ├── ports/              Abstract classes the adapters implement
│   │                       (ContentRepository, BusinessRepository, PreferencesRepository, Clock, SystemPreferences)
│   ├── use-cases/          IsOpenUseCase: is a schedule open at a given moment?
│   ├── state/              Signal-based stores (ThemeStore, OpeningStatusStore, BusinessProfileStore)
│   ├── adapters/           Implementations of the ports (static data, localStorage, Europe/Berlin clock, browser)
│   ├── content/            German texts
│   └── core.providers.ts   The only place that binds a port to an adapter
├── shared/                 Reusable building blocks with no feature knowledge
│   ├── directives/         Reveal and parallax
│   ├── services/           Smooth scroll, scroll spy
│   └── constants/          Section ids and image paths (site-map.constants.ts)
├── layout/                 Header (nav, theme switch, progress bar), Footer
├── features/               One folder per page section
│   ├── hero/  services/  history/  suppliers/  contact/  legal/
│   └── dismantling/        Includes the certificate dialog and its viewer service
├── app.component.*         Root component (ts, html, css)
└── app.config.ts
```

Each component is a folder with `name.component.ts`, `name.component.html` and `name.component.css`. A component's own
styles live in its CSS file; `src/styles.css` holds only what several components share (colours, typography, layout
helpers, reveal effects).

Imports use path aliases (defined in `tsconfig.json`): `@core/*`, `@shared/*`, `@layout/*`, `@features/*`.

Every component has a spec next to it, `name.component.spec.ts`, which renders it on its own and checks what the visitor
sees and can do.

Why it is split this way: replacing the bundled texts with a CMS, or moving preferences from localStorage to a cookie,
means writing one new adapter and changing one line in `core/core.providers.ts`. Nothing else changes.

## Common changes

| I want to…                        | Edit                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| Change a text                     | `core/content/de.content.ts`                                                                |
| Change phone, e-mail, hours, team | The owner does this at `/admin` (see below); the file is `core/content/owner-settings.json` |
| Change address, legal facts       | `core/adapters/static-business.repository.ts`                                               |
| Add a supplier logo               | Put the image in `public/images/`, add it to the same file                                  |
| Change colours (incl. dark mode)  | Variables at the top of `src/styles.css`                                                    |
| Add or reorder a section          | `features/`, `app.component.ts` + `.html`, `shared/constants/site-map.constants.ts`         |

The content type `SiteContent` lists every text, so a missing one is a compile error.

## Owner admin page

The owner changes phone, WhatsApp, e-mail, opening hours and who is on site at `/admin`, without a developer and without
a backend. The page is [Decap CMS](https://decapcms.org) (`public/admin/`): a form that saves
`src/app/core/content/owner-settings.json` to this repository through the GitHub API. The site is then rebuilt with the
new values.

- **What is editable** is defined in `public/admin/config.yml`. `parseOwnerSettings` (`core/models`) checks the file when
  the app starts and in the tests, so a wrong value fails the build instead of reaching visitors.
- **Saving:** `main` only takes pull requests with green checks, so the admin page runs in Decap's editorial workflow:
  "Speichern" opens a PR, and once the checks are green the owner sets it to "Fertig" and clicks "Veröffentlichen",
  which merges it.
- **Login:** the owner signs in with a GitHub account that has write access to this repository. The Cloudflare Worker in
  `worker/index.js` does the OAuth handshake; the token stays in the owner's browser.
- **Locally:** run `npx decap-server` next to `npm start` and open `http://localhost:4200/admin/index.html`. Changes are
  then written to your checkout, with no login.

### One-time setup on Cloudflare

The site runs as a Cloudflare Worker with static assets. `wrangler.jsonc` tells Cloudflare where the built site is
(`dist/auto-damm/browser`) and that `worker/index.js` answers `/api/*`.

1. In the dashboard, create a Worker from this repository (Workers & Pages → Create → Import a repository). Its name must
   match `name` in `wrangler.jsonc`. Leave the build command empty and keep the deploy command `npx wrangler deploy`:
   `wrangler.jsonc` runs `npm test && npm run build` before every deploy, and the tests keep a broken settings file
   from going live.
2. On GitHub, create an OAuth app (Settings → Developer settings → OAuth Apps) with the production address as homepage
   and `https://<site>/api/callback` as callback URL. The login works on that address only, not on preview URLs.
3. In the Worker, add the app's `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (as a secret) under Settings → Variables
   and Secrets.
4. Invite the owner's GitHub account to this repository with the "Write" role.

## Open points before going live

- **Fonts:** `src/index.html` loads Barlow Condensed and IBM Plex Sans from Google. In Germany this transfers visitor IPs to Google
  without consent. Self-host the font files instead (for example via `@fontsource`) before launch.
- **Certificates:** The two certificates in `public/images/` were issued 7 October 2024; the Demontagebetrieb certificate states validity until 7 April 2026.
  Replace them with the current ones.
- **Legal form:** The old site shows "OHG", "KG" and "e.K." in different places. Confirm the correct one and update the texts and
  `core/adapters/static-business.repository.ts`.
- **Handelsregister:** The old Impressum only says "2". Enter the full register number.
- **Datenschutzerklärung:** Placeholder text only. Add the real privacy policy.
- **Map:** Google Maps loads only after the visitor clicks "Karte laden". Mention it in the privacy policy.
- **Photos** are from 2019 and 1400 px wide. Newer, larger photos will look sharper on big screens.
