import { SiteContent } from '../../domain/models/site-content';

export const DE_CONTENT: SiteContent = {
  meta: {
    title: 'Auto-Damm – Autoteile und Altautoverwertung in Frankenberg',
    description: 'Autoteile, Zubehör und zertifizierte Altautoverwertung in Frankenberg/Sa.',
  },
  nav: {
    label: 'Hauptmenü',
    services: 'Leistungen',
    history: 'Geschichte',
    dismantling: 'Demontagebetrieb',
    suppliers: 'Lieferanten',
    contact: 'Kontakt',
  },
  controls: {
    themeToLight: 'Hell',
    themeToDark: 'Dunkel',
    languageAria: 'Language: English',
    close: 'Schließen',
    dialogLabel: 'Zertifikat in Großansicht',
    scrollDown: 'Weiter zu den Leistungen',
    enlarge: 'Zertifikat vergrößern',
  },
  hero: {
    title: 'Autoteile für die Region.',
    lead: 'Neue und gebrauchte Ersatzteile, Zubehör und zertifizierte Altautoverwertung in Frankenberg/Sa. Für Werkstätten und Privatkunden.',
    call: (phone) => `${phone} anrufen`,
    route: 'Route planen',
    liveTitle: 'Jetzt geöffnet?',
    shop: 'Teilehandel',
    shopHours: 'Mo–Fr 9–18 Uhr, Sa 9–12 Uhr',
    yard: 'Autoverwertung und Gebrauchtteile',
    yardHours: 'Mo–Fr 10–17 Uhr und nach Vereinbarung',
    note: 'Gilt für reguläre Öffnungszeiten, ohne Gewähr an Feiertagen.',
    open: 'Geöffnet',
    closed: 'Geschlossen',
  },
  services: {
    label: 'Leistungen',
    shop: {
      title: 'Autoteile und Zubehör',
      text: 'Als regionaler Groß- und Einzelhandel versorgen wir Werkstätten und Privatkunden mit Ersatzteilen und Autozubehör für PKW und NKW.',
      items: [
        'Groß- und Einzelhandel mit Ersatzteilen und Autozubehör',
        'Kostengünstiger täglicher Lieferservice bzw. Versand',
        'An- und Verkauf von Gebrauchtwagen und Unfallfahrzeugen',
      ],
      imageAlt: 'Das Geschäftshaus von Auto-Damm mit Firmenschild',
    },
    yard: {
      title: 'Altautoverwertung und Gebrauchtteile',
      text: 'Im Demontagebetrieb verwerten wir Altfahrzeuge fachgerecht und verkaufen geprüfte Gebrauchtteile.',
      items: [
        'Geprüfte Gebrauchtteile aus eigenem zertifizierten Zerlegungsbetrieb',
        'Autoverwertung, Verwertungsnachweis und umweltverträgliche Entsorgung',
        'Besuch auch nach Vereinbarung möglich',
      ],
      imageAlt: 'Fahrzeuge auf dem Verwertungsplatz von Auto-Damm',
    },
  },
  history: {
    title: 'Ein Familienbetrieb in der dritten Generation',
    imageAlt: 'Das Gebäude von Auto-Damm in Frankenberg',
    items: [
      'Groß- und Einzelhandel mit Ersatzteilen und Autozubehör für PKW und NKW.',
      'Kostengünstiger täglicher Lieferservice bzw. Versand.',
      'Verkauf von geprüften Gebrauchtteilen aus eigenem zertifizierten Zerlegungsbetrieb.',
      'An- und Verkauf von Gebrauchtwagen und Unfallfahrzeugen.',
      'Autoverwertung, Erstellung des Verwertungsnachweises und umweltverträgliche Entsorgung.',
    ],
    subtitle: 'Firmengeschichte',
    paragraphs: [
      'Die Fa. Moritz Damm und Sohn OHG ist ein Familienbetrieb in der dritten Generation.',
      'Die Firmengründer, Herr Moritz Damm und dessen Sohn Herr Helmut Damm, erschufen mit dem Neuanfang nach dem zweiten Weltkrieg aus einem ehemaligen „Autofriedhof“ einen Handelsbetrieb, welcher sich schwerpunktmäßig mit dem Handel von Autoteilen, Aggregaten und Baugruppen älterer Typen von Personenkraftwagen und Nutzfahrzeugen beschäftigte.',
      'Als ein solcher Spezialbetrieb erlangte die Firma einen hohen Bekanntheitsgrad. Ihr Kundenkreis war über das gesamte Territorium der ehemaligen DDR verstreut.',
    ],
  },
  dismantling: {
    title: 'Demontagebetrieb',
    imageAlt: 'Verwertungsplatz von Auto-Damm',
    intro: 'Das Unternehmen Auto Damm e.K. ist seit dem 28.04.1998 anerkannter Demontagebetrieb.',
    note: 'Bescheinigungen gemäß § 5 Abs. 3 Altfahrzeug-Verordnung, ausgestellt am 7. Oktober 2024. Zum Lesen anklicken.',
  },
  certificates: {
    demontage: {
      caption: 'Zertifikat Demontagebetrieb nach AltfahrzeugV',
      alt: 'Zertifikat Demontagebetrieb nach Altfahrzeug-Verordnung von KUC Dr. Kaussmann Umweltconsult',
    },
    arge: {
      caption: 'Bescheinigung der ArGe Altauto',
      alt: 'Bescheinigung der ArGe Altauto für einen ökologisch beanstandungsfreien Altfahrzeugverwertungsbetrieb',
    },
  },
  suppliers: {
    title: 'Lieferanten',
    paragraphs: [
      'Bei unseren Lieferanten handelt es sich ausschließlich um Marken-Hersteller mit jahrelanger Erfahrung als Zulieferer der Automobilindustrie. Alle Hersteller sind ISO 9001 zertifiziert. Durch die ständige Kontrolle wird ein hoher Qualitätsstandard sichergestellt.',
    ],
    highlight: 'Wir sind ein KFZ-Teile Fachgroßhandel!',
    quote: '„Die bittere Lehre von schlechter Qualität währt länger als das kurze Vergnügen niedriger Preise“',
  },
  contact: {
    title: 'So erreichen Sie uns',
    hoursTitle: 'Öffnungszeiten',
    hours: [
      { label: 'Teilehandel Mo–Fr', value: '9:00–18:00 Uhr' },
      { label: 'Teilehandel Sa', value: '9:00–12:00 Uhr' },
      { label: 'Verwertung Mo–Fr', value: '10:00–17:00 Uhr' },
    ],
    map: {
      title: 'Karte',
      text: 'Die Karte von Google Maps wird erst nach Ihrer Zustimmung geladen. Dabei werden Daten an Google übertragen.',
      load: 'Karte laden',
      external: 'In Google Maps öffnen',
    },
  },
  legal: {
    imprint: {
      title: 'Impressum',
      registerLabel: 'Handelsregister:',
      courtLabel: 'Registergericht:',
      contactTitle: 'Kontakt',
      phoneLabel: 'Telefon:',
      emailLabel: 'E-Mail:',
      vatTitle: 'Umsatzsteuer-ID',
      vatText: 'Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:',
      odrTitle: 'EU-Streitschlichtung',
      odrText: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
      odrNote: 'Unsere E-Mail-Adresse finden Sie oben im Impressum.',
      consumerTitle: 'Verbraucherstreitbeilegung/Universalschlichtungsstelle',
      consumerText:
        'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
    },
    privacy: {
      title: 'Datenschutzerklärung',
      text: 'Der Text der Datenschutzerklärung wird von der bisherigen Website übernommen.',
    },
  },
  footer: {
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
    contact: 'Kontakt',
  },
};
