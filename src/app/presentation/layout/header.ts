import { ChangeDetectionStrategy, Component, afterNextRender, computed, inject } from '@angular/core';

import { LanguageStore } from '../../application/language.store';
import { ThemeStore } from '../../application/theme.store';
import { ScrollStateService } from '../shared/scroll-state.service';
import { SmoothScrollService } from '../shared/smooth-scroll.service';
import { ALL_SECTION_IDS, SECTION } from '../shared/site-map';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header [class.sc]="scroll.scrolled()">
      <div class="wrap">
        <a class="brand" href="#home" (click)="go($event, 'home')"><b>AUTO</b>DAMM</a>

        <nav [attr.aria-label]="content().nav.label">
          @for (item of items(); track item.id) {
            <a
              [href]="'#' + item.id"
              [attr.aria-current]="scroll.activeSection() === item.id ? 'true' : null"
              (click)="go($event, item.id)"
              >{{ item.label }}</a
            >
          }
        </nav>

        <div class="ctl">
          <button type="button" (click)="theme.toggle()">
            {{ theme.isDark() ? content().controls.themeToLight : content().controls.themeToDark }}
          </button>
          <button
            type="button"
            [attr.lang]="language.otherLanguage()"
            [attr.aria-label]="content().controls.languageAria"
            (click)="language.toggle()"
          >
            {{ language.otherLanguage().toUpperCase() }}
          </button>
        </div>
      </div>
      <i class="bar" [style.transform]="'scaleX(' + scroll.progress() + ')'"></i>
    </header>
  `,
})
export class Header {
  protected readonly scroll = inject(ScrollStateService);
  protected readonly theme = inject(ThemeStore);
  protected readonly language = inject(LanguageStore);
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly content = this.language.content;

  protected readonly items = computed(() => {
    const nav = this.content().nav;
    return [
      { id: SECTION.services, label: nav.services },
      { id: SECTION.history, label: nav.history },
      { id: SECTION.dismantling, label: nav.dismantling },
      { id: SECTION.suppliers, label: nav.suppliers },
      { id: SECTION.contact, label: nav.contact },
    ];
  });

  constructor() {
    afterNextRender(() => this.scroll.start(ALL_SECTION_IDS));
  }

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.smoothScroll.to(id);
  }
}
