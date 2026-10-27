import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '../../application/business-profile.store';
import { LanguageStore } from '../../application/language.store';
import { RevealDirective } from '../shared/reveal.directive';
import { SECTION } from '../shared/site-map';

@Component({
  selector: 'app-legal',
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="legal" [id]="section.imprint">
      <div class="wrap doc sec" style="padding-bottom: 24px">
        <h2 class="st rv" appReveal>{{ imprint().title }}</h2>

        <div class="cols2 wide">
          <div>
            <p>
              {{ profile.owner }}<br />
              {{ profile.tradeName }}<br />
              {{ profile.street }}<br />
              {{ profile.postalCode }} {{ profile.city }}
            </p>
            <p>
              {{ imprint().registerLabel }} {{ profile.registerNumber }}<br />
              {{ imprint().courtLabel }} {{ profile.registerCourt }}
            </p>

            <h3>{{ imprint().contactTitle }}</h3>
            <p>
              {{ imprint().phoneLabel }} <a [href]="'tel:' + profile.phone.e164">{{ profile.phone.e164 }}</a><br />
              {{ imprint().emailLabel }} <a [href]="'mailto:' + profile.email">{{ profile.email }}</a>
            </p>

            <h3>{{ imprint().vatTitle }}</h3>
            <p>{{ imprint().vatText }}<br />{{ profile.vatId }}</p>
          </div>

          <div>
            <h3>{{ imprint().odrTitle }}</h3>
            <p>
              {{ imprint().odrText }}
              <a [href]="profile.odrUrl" rel="noopener">{{ profile.odrUrl }}</a
              >.<br />
              {{ imprint().odrNote }}
            </p>

            <h3>{{ imprint().consumerTitle }}</h3>
            <p>{{ imprint().consumerText }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="legal" [id]="section.privacy">
      <div class="wrap doc sec" style="padding-top: 24px">
        <h2 class="st rv" appReveal>{{ content().legal.privacy.title }}</h2>
        <p>{{ content().legal.privacy.text }}</p>
      </div>
    </section>
  `,
})
export class Legal {
  protected readonly content = inject(LanguageStore).content;
  protected readonly profile = inject(BusinessProfileStore).profile;
  protected readonly section = SECTION;

  protected imprint() {
    return this.content().legal.imprint;
  }
}
