import { Injectable, inject } from '@angular/core';

import { BusinessRepository } from '../domain/ports/business.repository';

/** The business facts plus the map links derived from them. */
@Injectable({ providedIn: 'root' })
export class BusinessProfileStore {
  readonly profile = inject(BusinessRepository).getProfile();

  private readonly query = encodeURIComponent(this.profile.mapsQuery);

  readonly directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.query}`;
  readonly searchUrl = `https://www.google.com/maps/search/?api=1&query=${this.query}`;
  readonly embedUrl = `https://www.google.com/maps?q=${this.query}&output=embed`;
}
