import { Injectable } from '@angular/core';

import { BusinessProfile } from '../domain/models/business-profile';
import { Weekday } from '../domain/models/opening-hours';
import { BusinessRepository } from '../domain/ports/business.repository';

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
    { name: 'Bosal', logo: 'images/logo-bosal.jpg' },
    { name: 'Liqui Moly', logo: 'images/logo-liqui-moly.jpg' },
    { name: 'febi bilstein', logo: 'images/logo-febi-bilstein.jpg' },
    { name: 'Mann Filter', logo: 'images/logo-mann-filter.jpg' },
    { name: 'NK', logo: 'images/logo-nk.jpg' },
    { name: 'Sachs', logo: 'images/logo-sachs.jpg' },
    { name: 'TRW', logo: 'images/logo-trw.jpg' },
    { name: 'Bosch', logo: 'images/logo-bosch.jpg' },
  ],
};

/** Adapter: business facts bundled with the app. */
@Injectable()
export class StaticBusinessRepository extends BusinessRepository {
  getProfile(): BusinessProfile {
    return PROFILE;
  }
}
