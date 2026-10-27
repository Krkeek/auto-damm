import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BusinessProfileStore } from '../../application/business-profile.store';
import { LanguageStore } from '../../application/language.store';
import { SmoothScrollService } from '../shared/smooth-scroll.service';
import { SECTION } from '../shared/site-map';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer>
      <div class="wrap">
        <span>© {{ profile.groupName }}</span>
        <span>
          <a [href]="'#' + section.imprint" (click)="go($event, section.imprint)">{{ content().footer.imprint }}</a>
          <a [href]="'#' + section.privacy" (click)="go($event, section.privacy)">{{ content().footer.privacy }}</a>
          <a [href]="'#' + section.contact" (click)="go($event, section.contact)">{{ content().footer.contact }}</a>
        </span>
      </div>
    </footer>
  `,
})
export class Footer {
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly content = inject(LanguageStore).content;
  protected readonly profile = inject(BusinessProfileStore).profile;
  protected readonly section = SECTION;

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.smoothScroll.to(id);
  }
}
