import { ChangeDetectionStrategy, Component, afterNextRender, computed, inject, signal } from '@angular/core';

import { ContentRepository } from '@core/ports/content.repository';
import { ThemeStore } from '@core/state/theme.store';
import { ScrollStateService } from '@shared/services/scroll-state.service';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';
import { ALL_SECTION_IDS, SECTION } from '@shared/constants/site-map.constants';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
})
export class HeaderComponent {
  protected readonly scroll = inject(ScrollStateService);
  protected readonly theme = inject(ThemeStore);
  private readonly smoothScroll = inject(SmoothScrollService);

  protected readonly content = inject(ContentRepository).getContent();

  protected readonly themeLabel = computed(() =>
    this.theme.isDark() ? this.content.controls.themeToLight : this.content.controls.themeToDark,
  );

  /** Whether the dropdown menu of the phone layout is open. */
  protected readonly menuOpen = signal(false);
  protected readonly menuLabel = computed(() =>
    this.menuOpen() ? this.content.controls.menuClose : this.content.controls.menuOpen,
  );

  protected readonly items = [
    { id: SECTION.services, label: this.content.nav.services },
    { id: SECTION.history, label: this.content.nav.history },
    { id: SECTION.dismantling, label: this.content.nav.dismantling },
    { id: SECTION.suppliers, label: this.content.nav.suppliers },
    { id: SECTION.contact, label: this.content.nav.contact },
  ];

  constructor() {
    afterNextRender(() => this.scroll.start(ALL_SECTION_IDS));
  }

  protected go(event: Event, id: string): void {
    event.preventDefault();
    this.menuOpen.set(false);
    this.smoothScroll.to(id);
  }
}
