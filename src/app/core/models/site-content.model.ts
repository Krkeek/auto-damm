import { CertificateId } from './business-profile.model';

export interface ServiceBlockContent {
  readonly title: string;
  readonly text: string;
  readonly items: readonly string[];
  readonly imageAlt: string;
}

export interface HoursRow {
  readonly label: string;
  readonly value: string;
}

/** All text of the site. */
export interface SiteContent {
  readonly meta: { readonly title: string; readonly description: string };
  readonly nav: {
    readonly label: string;
    readonly services: string;
    readonly history: string;
    readonly dismantling: string;
    readonly suppliers: string;
    readonly contact: string;
  };
  readonly controls: {
    readonly themeToLight: string;
    readonly themeToDark: string;
    readonly close: string;
    readonly dialogLabel: string;
    readonly scrollDown: string;
    readonly enlarge: string;
  };
  readonly hero: {
    readonly title: string;
    readonly lead: string;
    readonly call: (phone: string) => string;
    readonly route: string;
    readonly liveTitle: string;
    readonly shop: string;
    readonly shopHours: string;
    readonly yard: string;
    readonly yardHours: string;
    readonly note: string;
    readonly open: string;
    readonly closed: string;
  };
  readonly services: {
    readonly label: string;
    readonly shop: ServiceBlockContent;
    readonly yard: ServiceBlockContent;
  };
  readonly history: {
    readonly title: string;
    readonly imageAlt: string;
    readonly items: readonly string[];
    readonly subtitle: string;
    readonly paragraphs: readonly string[];
  };
  readonly dismantling: {
    readonly title: string;
    readonly imageAlt: string;
    readonly intro: string;
    readonly note: string;
  };
  readonly certificates: Readonly<Record<CertificateId, { readonly caption: string; readonly alt: string }>>;
  readonly suppliers: {
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly highlight: string;
    readonly quote: string;
  };
  readonly contact: {
    readonly title: string;
    readonly hoursTitle: string;
    readonly hours: readonly HoursRow[];
    readonly map: {
      readonly title: string;
      readonly text: string;
      readonly load: string;
      readonly external: string;
    };
  };
  readonly legal: {
    readonly imprint: {
      readonly title: string;
      readonly registerLabel: string;
      readonly courtLabel: string;
      readonly contactTitle: string;
      readonly phoneLabel: string;
      readonly emailLabel: string;
      readonly vatTitle: string;
      readonly vatText: string;
      readonly odrTitle: string;
      readonly odrText: string;
      readonly odrNote: string;
      readonly consumerTitle: string;
      readonly consumerText: string;
    };
    readonly privacy: { readonly title: string; readonly text: string };
  };
  readonly footer: {
    readonly imprint: string;
    readonly privacy: string;
    readonly contact: string;
  };
}
