import { SiteContent } from '../../domain/models/site-content';

export const EN_CONTENT: SiteContent = {
  meta: {
    title: 'Auto-Damm – Car parts and vehicle recycling in Frankenberg',
    description: 'Car parts, accessories and certified end-of-life vehicle recycling in Frankenberg/Sa., Germany.',
  },
  nav: {
    label: 'Main menu',
    services: 'Services',
    history: 'History',
    dismantling: 'Dismantling',
    suppliers: 'Suppliers',
    contact: 'Contact',
  },
  controls: {
    themeToLight: 'Light',
    themeToDark: 'Dark',
    languageAria: 'Sprache: Deutsch',
    close: 'Close',
    dialogLabel: 'Certificate in full size',
    scrollDown: 'Continue to services',
    enlarge: 'Enlarge certificate',
  },
  hero: {
    title: 'Car parts for the region.',
    lead: 'New and used spare parts, accessories and certified end-of-life vehicle recycling in Frankenberg/Sa. For workshops and private customers.',
    call: (phone) => `Call ${phone}`,
    route: 'Get directions',
    liveTitle: 'Open now?',
    shop: 'Parts shop',
    shopHours: 'Mon–Fri 9 am–6 pm, Sat 9 am–12 pm',
    yard: 'Vehicle recycling and used parts',
    yardHours: 'Mon–Fri 10 am–5 pm and by appointment',
    note: 'Regular opening hours; holidays may differ.',
    open: 'Open',
    closed: 'Closed',
  },
  services: {
    label: 'Services',
    shop: {
      title: 'Car parts and accessories',
      text: 'As a regional wholesaler and retailer, we supply workshops and private customers with spare parts and accessories for cars and commercial vehicles.',
      items: [
        'Wholesale and retail of spare parts and accessories',
        'Low-cost daily delivery service or shipping',
        'Purchase and sale of used cars and accident vehicles',
      ],
      imageAlt: 'The Auto-Damm business building with company sign',
    },
    yard: {
      title: 'Vehicle recycling and used parts',
      text: 'In our dismantling facility we recycle end-of-life vehicles properly and sell tested used parts.',
      items: [
        'Tested used parts from our own certified dismantling facility',
        'Vehicle recycling, certificate of destruction and environmentally sound disposal',
        'Visits also possible by appointment',
      ],
      imageAlt: 'Vehicles on the Auto-Damm recycling yard',
    },
  },
  history: {
    title: 'A family business in its third generation',
    imageAlt: 'The Auto-Damm building in Frankenberg',
    items: [
      'Wholesale and retail of spare parts and car accessories for cars and commercial vehicles.',
      'Low-cost daily delivery service or shipping.',
      'Sale of tested used parts from our own certified dismantling facility.',
      'Purchase and sale of used cars and accident vehicles.',
      'Vehicle recycling, issue of the certificate of destruction and environmentally sound disposal.',
    ],
    subtitle: 'Company history',
    paragraphs: [
      'Moritz Damm und Sohn OHG is a family business in its third generation.',
      'The founders, Moritz Damm and his son Helmut Damm, made a fresh start after the Second World War and turned a former “car graveyard” into a trading business that focused on parts, units and assemblies for older types of cars and commercial vehicles.',
      'As such a specialist business, the company became widely known. Its customers were spread across the whole territory of the former GDR.',
    ],
  },
  dismantling: {
    title: 'Dismantling facility',
    imageAlt: 'The Auto-Damm recycling yard',
    intro: 'Auto Damm e.K. has been a recognised dismantling facility since 28 April 1998.',
    note: 'Certificates under Section 5(3) of the End-of-Life Vehicles Ordinance, issued on 7 October 2024. Click to read.',
  },
  certificates: {
    demontage: {
      caption: 'Dismantling facility certificate (AltfahrzeugV)',
      alt: 'Dismantling facility certificate under the End-of-Life Vehicles Ordinance by KUC Dr. Kaussmann Umweltconsult',
    },
    arge: {
      caption: 'Certificate from ArGe Altauto',
      alt: 'ArGe Altauto certificate for an ecologically unobjectionable vehicle recycling facility',
    },
  },
  suppliers: {
    title: 'Suppliers',
    paragraphs: [
      'Our suppliers are exclusively brand manufacturers with many years of experience as suppliers to the automotive industry. All manufacturers are ISO 9001 certified. Constant monitoring ensures a high quality standard.',
    ],
    highlight: 'We are a specialist wholesaler of car parts!',
    quote: '“The bitter lesson of poor quality lasts longer than the brief pleasure of low prices”',
  },
  contact: {
    title: 'How to reach us',
    hoursTitle: 'Opening hours',
    hours: [
      { label: 'Parts shop Mon–Fri', value: '9:00–18:00' },
      { label: 'Parts shop Sat', value: '9:00–12:00' },
      { label: 'Recycling Mon–Fri', value: '10:00–17:00' },
    ],
    map: {
      title: 'Map',
      text: 'Google Maps only loads after you give your consent. Data is transferred to Google when it loads.',
      load: 'Load map',
      external: 'Open in Google Maps',
    },
  },
  legal: {
    imprint: {
      title: 'Imprint',
      registerLabel: 'Commercial register:',
      courtLabel: 'Register court:',
      contactTitle: 'Contact',
      phoneLabel: 'Phone:',
      emailLabel: 'Email:',
      vatTitle: 'VAT ID',
      vatText: 'VAT identification number according to Section 27a of the German VAT Act:',
      odrTitle: 'EU dispute resolution',
      odrText: 'The European Commission provides a platform for online dispute resolution (ODR):',
      odrNote: 'You can find our email address above in the imprint.',
      consumerTitle: 'Consumer dispute resolution',
      consumerText:
        'We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.',
    },
    privacy: {
      title: 'Privacy policy',
      text: 'The privacy policy text will be carried over from the current website.',
    },
  },
  footer: {
    imprint: 'Imprint',
    privacy: 'Privacy policy',
    contact: 'Contact',
  },
};
