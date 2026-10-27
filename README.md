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

The code follows the dependency rule of clean architecture: dependencies point inwards only.

```
presentation  ──►  application  ──►  domain  ◄──  infrastructure
 (components)       (state)         (rules,        (adapters)
                                     ports)
```

```
src/app/
├── domain/             No UI, storage or browser code
│   ├── models/         Language, Theme, OpeningSchedule, BusinessProfile, SiteContent
│   ├── ports/          Abstract classes the outer layers must implement
│   │                   (ContentRepository, BusinessRepository, PreferencesRepository, Clock, SystemPreferences)
│   └── use-cases/      IsOpenUseCase: is a schedule open at a given moment?
├── application/        Signal-based stores that combine ports and use cases
│                       (LanguageStore, ThemeStore, OpeningStatusStore, BusinessProfileStore)
├── infrastructure/     Adapters for the ports
│   ├── content/        German and English texts
│   ├── static-*.ts     Bundled content and business data
│   ├── local-storage-preferences.repository.ts
│   ├── system-clock.ts (time in Europe/Berlin)
│   ├── browser-system-preferences.ts
│   └── providers.ts    The only place that binds a port to an adapter
└── presentation/
    ├── layout/         Header (nav, theme and language switch, progress bar), Footer
    ├── sections/       Hero, Services, History, Dismantling, Suppliers, Contact, Legal
    └── shared/         Smooth scroll, scroll spy, reveal and parallax directives, certificate dialog
```

Why it is split this way: replacing the bundled texts with a CMS, or moving preferences from localStorage to a cookie,
means writing one new adapter and changing one line in `infrastructure/providers.ts`. Nothing else changes.

## Common changes

| I want to…                         | Edit                                                        |
| ---------------------------------- | ----------------------------------------------------------- |
| Change a text                      | `infrastructure/content/de.content.ts` and `en.content.ts`  |
| Change address, phone, hours       | `infrastructure/static-business.repository.ts`              |
| Add a supplier logo                | Put the image in `public/images/`, add it to the same file  |
| Add a language                     | Add it to `domain/models/language.ts`, add a content file, register it in `static-content.repository.ts` |
| Change colours (incl. dark mode)   | Variables at the top of `src/styles.css`                    |
| Add or reorder a section           | `presentation/sections/`, `app.ts`, `presentation/shared/site-map.ts` |

The content type `SiteContent` forces every language to provide every text, so a missing translation is a compile error.

## Open points before going live

- **Fonts:** `src/index.html` loads Barlow Condensed and IBM Plex Sans from Google. In Germany this transfers visitor IPs to Google
  without consent. Self-host the font files instead (for example via `@fontsource`) before launch.
- **Certificates:** The two certificates in `public/images/` were issued 7 October 2024; the Demontagebetrieb certificate states validity until 7 April 2026.
  Replace them with the current ones.
- **Legal form:** The old site shows "OHG", "KG" and "e.K." in different places. Confirm the correct one and update the texts and
  `static-business.repository.ts`.
- **Handelsregister:** The old Impressum only says "2". Enter the full register number.
- **Datenschutzerklärung:** Placeholder text only. Add the real privacy policy.
- **English texts** are a translation by the developer; the German Impressum is the legally binding version.
- **Map:** Google Maps loads only after the visitor clicks "Karte laden". Mention it in the privacy policy.
- **Photos** are from 2019 and 1400 px wide. Newer, larger photos will look sharper on big screens.
