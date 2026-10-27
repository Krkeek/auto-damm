import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '../../application/business-profile.store';
import { LanguageStore } from '../../application/language.store';
import { CertificateViewerService } from '../shared/certificate-viewer.service';
import { ParallaxDirective } from '../shared/parallax.directive';
import { RevealDirective } from '../shared/reveal.directive';
import { IMAGES, SECTION } from '../shared/site-map';

@Component({
  selector: 'app-dismantling',
  imports: [RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="band" [id]="section.dismantling">
      <div class="wrap doc sec">
        <h2 class="st rv" appReveal>{{ content().dismantling.title }}</h2>

        <div class="pw wide" appReveal appParallax>
          <img class="ph" [src]="images.yard" [alt]="content().dismantling.imageAlt" width="1400" height="430" />
        </div>

        <div class="split wide">
          <div>
            <p data-reveal appReveal>{{ content().dismantling.intro }}</p>
            <p data-reveal appReveal [appRevealDelay]="80">{{ content().dismantling.note }}</p>
          </div>

          <div class="certs">
            @for (certificate of profile.certificates; track certificate.id; let i = $index) {
              @let text = content().certificates[certificate.id];
              <figure data-reveal appReveal [appRevealDelay]="i * 80">
                <button
                  type="button"
                  [attr.aria-label]="content().controls.enlarge"
                  (click)="viewer.open({ src: certificate.image, alt: text.alt })"
                >
                  <img [src]="certificate.image" [alt]="text.alt" loading="lazy" />
                </button>
                <figcaption>{{ text.caption }}</figcaption>
              </figure>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Dismantling {
  protected readonly viewer = inject(CertificateViewerService);
  protected readonly content = inject(LanguageStore).content;
  protected readonly profile = inject(BusinessProfileStore).profile;
  protected readonly images = IMAGES;
  protected readonly section = SECTION;
}
