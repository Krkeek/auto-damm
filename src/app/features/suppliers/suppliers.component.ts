import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '@core/state/business-profile.store';
import { ContentRepository } from '@core/ports/content.repository';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-suppliers',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './suppliers.component.html',
})
export class SuppliersComponent {
  protected readonly content = inject(ContentRepository).getContent();
  protected readonly profile = inject(BusinessProfileStore).profile;
  protected readonly section = SECTION;
}
