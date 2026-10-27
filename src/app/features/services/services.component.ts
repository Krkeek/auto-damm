import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { LanguageStore } from '@core/state/language.store';
import { ParallaxDirective } from '@shared/directives/parallax.directive';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { IMAGES, SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-services',
  imports: [RevealDirective, ParallaxDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  protected readonly content = inject(LanguageStore).content;
  protected readonly section = SECTION;

  protected readonly blocks = computed(() => {
    const services = this.content().services;
    return [
      { key: 'shop', dark: false, image: IMAGES.shop, position: '40% 50%', data: services.shop },
      { key: 'yard', dark: true, image: IMAGES.yard, position: '50% 50%', data: services.yard },
    ];
  });
}
