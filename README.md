# Auto-Damm website

One-page website for Auto Damm (Frankenberg/Sa.): car parts, accessories and end-of-life vehicle recycling.
Built with Angular (standalone components, signals, zoneless change detection). German and English, light and dark mode.

## Run

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/auto-damm
```

Requires Node 20.19+ or 22.12+.

## Architecture

The code is organised by feature, following the Angular style guide. App-wide logic lives in `core/`, where ports
(abstract classes) are bound to adapters, so components never depend on storage, the clock or the browser directly.

```
src/app/
├── core/                   App-wide singletons; no UI
│   ├── models/             Language, Theme, OpeningSchedule, BusinessProfile, SiteContent
│   ├── ports/              Abstract classes the adapters implement
│   │                       (ContentRepository, BusinessRepository, PreferencesRepository, Clock, SystemPreferences)
│   ├── use-cases/          IsOpenUseCase: is a schedule open at a given moment?
│   ├── state/              Signal-based stores (LanguageStore, ThemeStore, OpeningStatusStore, BusinessProfileStore)
│   ├── adapters/           Implementations of the ports (static data, localStorage, Europe/Berlin clock, browser)
│   ├── content/            German and English texts
│   └── core.providers.ts   The only place that binds a port to an adapter
├── shared/                 Reusable building blocks with no feature knowledge
│   ├── directives/         Reveal and parallax
│   ├── services/           Smooth scroll, scroll spy
│   └── constants/          Section ids and image paths (site-map.constants.ts)
├── layout/                 Header (nav, theme and language switch, progress bar), Footer
├── features/               One folder per page section
│   ├── hero/  services/  history/  suppliers/  contact/  legal/
│   └── dismantling/        Includes the certificate dialog and its viewer service
├── app.component.ts|html   Root component
└── app.config.ts
```

Each component is a folder with `name.component.ts` and `name.component.html`. Styles are global in `src/styles.css`.

Imports use path aliases (defined in `tsconfig.json`): `@core/*`, `@shared/*`, `@layout/*`, `@features/*`.

Why it is split this way: replacing the bundled texts with a CMS, or moving preferences from localStorage to a cookie,
means writing one new adapter and changing one line in `core/core.providers.ts`. Nothing else changes.

## Common changes

| I want to…                         | Edit                                                        |
| ---------------------------------- | ----------------------------------------------------------- |
| Change a text                      | `core/content/de.content.ts` and `en.content.ts`            |
| Change address, phone, hours       | `core/adapters/static-business.repository.ts`               |
| Add a supplier logo                | Put the image in `public/images/`, add it to the same file  |
| Add a language                     | Add it to `core/models/language.model.ts`, add a content file, register it in `core/adapters/static-content.repository.ts` |
| Change colours (incl. dark mode)   | Variables at the top of `src/styles.css`                    |
| Add or reorder a section           | `features/`, `app.component.ts` + `.html`, `shared/constants/site-map.constants.ts` |

The content type `SiteContent` forces every language to provide every text, so a missing translation is a compile error.

## Open points before going live

- **Fonts:** `src/index.html` loads Barlow Condensed and IBM Plex Sans from Google. In Germany this transfers visitor IPs to Google
  without consent. Self-host the font files instead (for example via `@fontsource`) before launch.
- **Certificates:** The two certificates in `public/images/` were issued 7 October 2024; the Demontagebetrieb certificate states validity until 7 April 2026.
  Replace them with the current ones.
- **Legal form:** The old site shows "OHG", "KG" and "e.K." in different places. Confirm the correct one and update the texts and
  `core/adapters/static-business.repository.ts`.
- **Handelsregister:** The old Impressum only says "2". Enter the full register number.
- **Datenschutzerklärung:** Placeholder text only. Add the real privacy policy.
- **English texts** are a translation by the developer; the German Impressum is the legally binding version.
- **Map:** Google Maps loads only after the visitor clicks "Karte laden". Mention it in the privacy policy.
- **Photos** are from 2019 and 1400 px wide. Newer, larger photos will look sharper on big screens.
