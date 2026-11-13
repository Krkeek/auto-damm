# CLAUDE.md

Guidance for Claude Code in this repository. The [README](README.md) has the full details; this file lists the rules to follow.

## Project

One-page website for Auto Damm (Frankenberg/Sa.): car parts, accessories and end-of-life vehicle recycling. German only,
light and dark mode. Angular 22 with standalone components, signals and zoneless change detection
(`provideZonelessChangeDetection` in `src/app/app.config.ts`), TypeScript 6 in `strict` mode, Vitest 5 through
`@angular/build:unit-test`. Node version is in `.nvmrc`.

## Commands

```bash
npm start            # dev server, http://localhost:4200
npm test             # unit tests once
npm run lint         # ESLint, incl. layer rules (lint:fix to auto-fix)
npm run format       # Prettier (format:check in CI)
npm run typecheck    # app and spec tsconfigs
npm run ci           # everything GitHub CI runs: lint, format, typecheck, tests with coverage, build
```

Run `npm run ci` before calling a change done.

## Architecture rules

ESLint (`eslint-plugin-boundaries`, see `eslint.config.mjs`) fails on imports that cross a layer boundary:

- `core/models`, `core/use-cases`: only models. Pure TypeScript, no Angular or RxJS.
- `core/ports`, `core/content`: only models.
- `core/adapters`: models, ports, content. Only `core/core.providers.ts` may import adapters; it is the one place that
  binds a port (abstract class) to an adapter.
- `core/state`: models, ports, use cases, other stores.
- `shared`: models, ports, state, shared. Never features or layout.
- `features/<name>`, `layout/<name>`: models, ports, state, shared and their own folder. Never another feature.
- Across layers, import through the `@core/*`, `@shared/*`, `@layout/*`, `@features/*` aliases, not `../`.

Components depend on ports and stores, never on `localStorage`, `Date` or browser APIs directly.

## Conventions

- A component is a folder with `name.component.ts`, `name.component.html` and `name.component.css` (linked with
  `styleUrl`), uses `ChangeDetectionStrategy.OnPush`, gets dependencies with `inject()`, and exposes template members as
  `protected readonly`.
- A component's own styles go in its CSS file, which starts with `:host { display: contents; }` so the host element adds
  no box. `src/styles.css` holds only what several components share: colour variables (incl. dark mode) at the top, base
  typography, layout helpers (`.wrap`, `.sec`, `.doc`, `.btn`, `.btns`, `.pw`/`.ph`), the reveal effects and the
  reduced-motion rules. Component styles are scoped, so a selector there cannot reach another component's elements; use
  `:host-context(.js)` for rules that depend on a class on `<html>`.
- App state lives in signal stores in `core/state` (`signal`/`computed`, `providedIn: 'root'`).
- Every user-facing text goes in `core/content/de.content.ts`, typed by `SiteContent`. Do not hard-code text in templates.
- Address, phone, opening hours and suppliers: `core/adapters/static-business.repository.ts`. Section ids and image
  paths: `shared/constants/site-map.constants.ts`. Images: `public/images/`.
- Keep comments sparse: a short JSDoc on classes and non-obvious members, like the existing code.

## Tests

- Specs sit next to the file as `*.spec.ts`. Fake ports with small classes or `useValue` providers in `TestBed`
  (see `core/state/theme.store.spec.ts`).
- Coverage must stay at or above 80% lines/statements/functions and 70% branches (`angular.json`); `core/content` and
  `core/models` are excluded. New logic in stores, use cases, adapters or services needs specs.

## Git and PRs

- `main` is protected: work on a branch and open a PR. PRs are squash-merged.
- PR titles use Conventional Commits (`feat:`, `fix:`, `chore:`, `ci:`, `docs:`, …); CI checks the title.

## Before going live

The README's "Open points before going live" lists known gaps (self-hosting Google Fonts, expired certificates, legal
form, Handelsregister number, privacy policy). Keep them in mind, but do not change them unless asked.
