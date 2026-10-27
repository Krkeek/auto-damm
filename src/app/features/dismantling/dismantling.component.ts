import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '@core/state/business-profile.store';
import { ContentRepository } from '@core/ports/content.repository';
import { CertificateViewerService } from './certificate-viewer.service';
import { ParallaxDirective } from '@shared/directives/parallax.directive';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IMAGES, SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-dismantling',
  imports: [RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dismantling.component.html',
})
export class DismantlingComponent {
  protected readonly viewer = inject(CertificateViewerService);
  protected readonly content = inject(ContentRepository).getContent();
  protected readonly profile = inject(BusinessProfileStore).profile;
  protected readonly images = IMAGES;
  protected readonly section = SECTION;
}
