import { Injectable, inject } from '@angular/core';

import { BusinessRepository } from '@core/ports/business.repository';

/** The business facts plus the map and chat links derived from them. */
@Injectable({ providedIn: 'root' })
export class BusinessProfileStore {
  readonly profile = inject(BusinessRepository).getProfile();

  private readonly query = encodeURIComponent(this.profile.mapsQuery);

  readonly directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${this.query}`;
  readonly searchUrl = `https://www.google.com/maps/search/?api=1&query=${this.query}`;
  readonly embedUrl = `https://www.google.com/maps?q=${this.query}&output=embed`;

  /** wa.me expects the number with country code, digits only. */
  readonly whatsappUrl = `https://wa.me/${this.profile.whatsapp.replace(/\D/g, '')}`;
}
