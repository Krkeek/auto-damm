/** Section ids used for navigation, scroll spy and in-page links. */
export const SECTION = {
  home: 'home',
  services: 'leistungen',
  history: 'geschichte',
  dismantling: 'demontagebetrieb',
  suppliers: 'lieferanten',
  contact: 'kontakt',
  imprint: 'impressum',
  privacy: 'datenschutz',
} as const;

export const ALL_SECTION_IDS: readonly string[] = Object.values(SECTION);

export const IMAGES = {
  street: 'images/street.jpg',
  shop: 'images/shop.jpg',
  yard: 'images/yard.jpg',
} as const;
