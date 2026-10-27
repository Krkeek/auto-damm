import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '../../application/business-profile.store';
import { LanguageStore } from '../../application/language.store';
import { OpeningStatusStore } from '../../application/opening-status.store';
import { SmoothScrollService } from '../shared/smooth-scroll.service';
import { IMAGES, SECTION } from '../shared/site-map';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" [id]="section.home">
      <img class="bg" [src]="images.street" alt="" />

      <div class="wrap">
        <div>
          <h1>{{ content().hero.title }}</h1>
          <p class="lead" data-in style="--i: 1">{{ content().hero.lead }}</p>
          <div class="btns" data-in style="--i: 2">
            <a class="btn primary" [href]="'tel:' + business.profile.phone.e164">{{
              content().hero.call(business.profile.phone.display)
            }}</a>
            <a class="btn" [href]="business.directionsUrl" rel="noopener">{{ content().hero.route }}</a>
          </div>
        </div>

        <aside class="sign" data-in style="--i: 3" aria-labelledby="live-title">
          <h2 id="live-title">{{ content().hero.liveTitle }}</h2>

          <div class="row">
            <div>
              <strong>{{ content().hero.shop }}</strong>
              <small>{{ content().hero.shopHours }}</small>
            </div>
            <span class="state" [class.open]="status.shopOpen()" [class.closed]="!status.shopOpen()">{{
              status.shopOpen() ? content().hero.open : content().hero.closed
            }}</span>
          </div>

          <div class="row">
            <div>
              <strong>{{ content().hero.yard }}</strong>
              <small>{{ content().hero.yardHours }}</small>
            </div>
            <span class="state" [class.open]="status.yardOpen()" [class.closed]="!status.yardOpen()">{{
              status.yardOpen() ? content().hero.open : content().hero.closed
            }}</span>
          </div>

          <p class="note">{{ content().hero.note }}</p>
        </aside>
      </div>

      <a
        class="cue"
        [href]="'#' + section.services"
        [attr.aria-label]="content().controls.scrollDown"
        (click)="scrollDown($event)"
      ></a>
    </section>
  `,
})
export class Hero {
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly content = inject(LanguageStore).content;
  protected readonly business = inject(BusinessProfileStore);
  protected readonly status = inject(OpeningStatusStore);
  protected readonly images = IMAGES;
  protected readonly section = SECTION;

  protected scrollDown(event: Event): void {
    event.preventDefault();
    this.smoothScroll.to(SECTION.services);
  }
}
