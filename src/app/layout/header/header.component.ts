import { ChangeDetectionStrategy, Component, afterNextRender, computed, inject } from '@angular/core';

import { LanguageStore } from '@core/state/language.store';
import { ThemeStore } from '@core/state/theme.store';
import { ScrollStateService } from '@shared/services/scroll-state.service';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';
import { ALL_SECTION_IDS, SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
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
