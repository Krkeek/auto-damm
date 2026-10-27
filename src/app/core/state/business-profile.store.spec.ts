import { TestBed } from '@angular/core/testing';

import { BusinessProfile } from '@core/models/business-profile.model';
import { BusinessRepository } from '@core/ports/business.repository';
import { BusinessProfileStore } from '@core/state/business-profile.store';

describe('BusinessProfileStore', () => {
  it('builds URL-encoded map links from the address', () => {
    const profile = { mapsQuery: 'Äußere Str. 49, 09669 Frankenberg' } as BusinessProfile;
    TestBed.configureTestingModule({
      providers: [{ provide: BusinessRepository, useValue: { getProfile: () => profile } }],
    });
    const store = TestBed.inject(BusinessProfileStore);
    const encoded = encodeURIComponent(profile.mapsQuery);

    expect(store.profile).toBe(profile);
    expect(store.directionsUrl).toBe(`https://www.google.com/maps/dir/?api=1&destination=${encoded}`);
    expect(store.searchUrl).toBe(`https://www.google.com/maps/search/?api=1&query=${encoded}`);
    expect(store.embedUrl).toBe(`https://www.google.com/maps?q=${encoded}&output=embed`);
  });
});
