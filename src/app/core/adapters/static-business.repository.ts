import { Injectable } from '@angular/core';

import { BusinessProfile } from '@core/models/business-profile.model';
import { Weekday } from '@core/models/opening-hours.model';
import { BusinessRepository } from '@core/ports/business.repository';

const WORKDAYS: readonly Weekday[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const PROFILE: BusinessProfile = {
  tradeName: 'Auto Damm e.K.',
  groupName: 'Moritz Damm & Sohn KG',
  owner: 'Kirstin Lippmann',
  street: 'Äußere Chemnitzer Str. 49',
  postalCode: '09669',
  city: 'Frankenberg/Sa.',
  mapsQuery: 'Äußere Chemnitzer Str. 49, 09669 Frankenberg',
  phone: { display: '037206 / 6070', e164: '+49372066070' },
  whatsapp: '+49372066070',
  email: 'info@auto-damm.de',
  registerNumber: '2',
  registerCourt: 'Amtsgericht Chemnitz',
  vatId: 'DE141212015',
  odrUrl: 'https://ec.europa.eu/consumers/odr/',
  schedules: {
    shop: {
      ranges: [
        { days: WORKDAYS, fromHour: 9, toHour: 18 },
        { days: ['Sat'], fromHour: 9, toHour: 12 },
      ],
    },
    yard: {
      ranges: [{ days: WORKDAYS, fromHour: 10, toHour: 17 }],
    },
  },
  certificates: [
    { id: 'demontage', image: 'images/cert-demontage.jpg' },
    { id: 'arge', image: 'images/cert-arge.jpg' },
  ],
  suppliers: [
    { name: 'Bosal', logo: 'images/logo-bosal.jpg', width: 710, height: 206 },
    { name: 'Liqui Moly', logo: 'images/logo-liqui-moly.jpg', width: 414, height: 280 },
    { name: 'febi bilstein', logo: 'images/logo-febi-bilstein.jpg', width: 322, height: 280 },
    { name: 'Mann Filter', logo: 'images/logo-mann-filter.png', width: 2000, height: 960 },
    { name: 'NK', logo: 'images/logo-nk.jpg', width: 281, height: 280 },
    { name: 'Sachs', logo: 'images/logo-sachs.jpg', width: 481, height: 280 },
    { name: 'TRW', logo: 'images/logo-trw.png', width: 2300, height: 938 },
    { name: 'Bosch', logo: 'images/logo-bosch.webp', width: 1280, height: 541 },
  ],
};

/** Adapter: business facts bundled with the app. */
@Injectable()
export class StaticBusinessRepository extends BusinessRepository {
  getProfile(): BusinessProfile {
    return PROFILE;
  }
}
