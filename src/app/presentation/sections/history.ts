import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LanguageStore } from '../../application/language.store';
import { ParallaxDirective } from '../shared/parallax.directive';
import { RevealDirective } from '../shared/reveal.directive';
import { IMAGES, SECTION } from '../shared/site-map';

@Component({
  selector: 'app-history',
  imports: [RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section [id]="section.history">
      <div class="wrap doc sec">
        <h2 class="st rv" appReveal>{{ content().history.title }}</h2>

        <div class="pw wide" appReveal appParallax>
          <img class="ph" [src]="images.street" [alt]="content().history.imageAlt" width="1400" height="430" />
        </div>

        <div class="hist wide">
          <ul>
            @for (item of content().history.items; track item; let i = $index) {
              <li data-reveal appReveal [appRevealDelay]="i * 80">{{ item }}</li>
            }
          </ul>

          <div>
            <h3 data-reveal appReveal>{{ content().history.subtitle }}</h3>
            @for (paragraph of content().history.paragraphs; track paragraph; let i = $index) {
              <p data-reveal appReveal [appRevealDelay]="(i + 1) * 80">{{ paragraph }}</p>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class History {
  protected readonly content = inject(LanguageStore).content;
  protected readonly images = IMAGES;
  protected readonly section = SECTION;
}
