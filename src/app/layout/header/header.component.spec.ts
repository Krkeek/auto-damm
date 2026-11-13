import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { PreferencesRepository } from '@core/ports/preferences.repository';
import { SystemPreferences } from '@core/ports/system-preferences.port';
import { HeaderComponent } from '@layout/header/header.component';
import { ALL_SECTION_IDS, SECTION } from '@shared/constants/site-map.constants';
import { ScrollStateService } from '@shared/services/scroll-state.service';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';

describe('HeaderComponent', () => {
  async function setup() {
    const smoothScroll = { to: vi.fn() };
    const scrollState = {
      scrolled: signal(false),
      progress: signal(0),
      activeSection: signal<string>(SECTION.home),
      start: vi.fn(),
    };
    const preferences = { getTheme: () => null, setTheme: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        provideCore(),
        { provide: SmoothScrollService, useValue: smoothScroll },
        { provide: ScrollStateService, useValue: scrollState },
        { provide: PreferencesRepository, useValue: preferences },
        { provide: SystemPreferences, useValue: { prefersDark: signal(false), prefersReducedMotion: false } },
      ],
    });
    const fixture = TestBed.createComponent(HeaderComponent);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    return { fixture, root, header: root.querySelector('header'), smoothScroll, scrollState, preferences };
  }

  it('links to the five main sections and starts the scroll spy', async () => {
    const { root, scrollState } = await setup();
    const links = [...root.querySelectorAll<HTMLAnchorElement>('nav a')];

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      `#${SECTION.services}`,
      `#${SECTION.history}`,
      `#${SECTION.dismantling}`,
      `#${SECTION.suppliers}`,
      `#${SECTION.contact}`,
    ]);
    expect(links.map((link) => link.textContent.trim())).toContain(DE_CONTENT.nav.contact);
    expect(scrollState.start).toHaveBeenCalledWith(ALL_SECTION_IDS);
  });

  it('marks the section in view and shows the scroll progress', async () => {
    const { fixture, root, header, scrollState } = await setup();

    scrollState.activeSection.set(SECTION.contact);
    scrollState.scrolled.set(true);
    scrollState.progress.set(0.5);
    await fixture.whenStable();

    const current = root.querySelectorAll('nav a[aria-current="true"]');
    expect(current).toHaveLength(1);
    expect(current[0].getAttribute('href')).toBe(`#${SECTION.contact}`);
    expect(header?.classList.contains('sc')).toBe(true);
    expect(root.querySelector<HTMLElement>('.bar')?.style.transform).toBe('scaleX(0.5)');
  });

  it('scrolls smoothly instead of jumping when a link is clicked', async () => {
    const { root, smoothScroll } = await setup();
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });

    root.querySelector(`nav a[href="#${SECTION.suppliers}"]`)?.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(smoothScroll.to).toHaveBeenCalledWith(SECTION.suppliers);
  });

  it('opens the menu and closes it on a link click or Escape', async () => {
    const { fixture, root, header } = await setup();
    const button = root.querySelector<HTMLButtonElement>('button.menu');

    expect(button?.getAttribute('aria-expanded')).toBe('false');
    expect(button?.getAttribute('aria-label')).toBe(DE_CONTENT.controls.menuOpen);

    button?.click();
    await fixture.whenStable();
    expect(header?.classList.contains('open')).toBe(true);
    expect(button?.getAttribute('aria-expanded')).toBe('true');
    expect(button?.getAttribute('aria-label')).toBe(DE_CONTENT.controls.menuClose);

    root.querySelector<HTMLAnchorElement>('nav a')?.click();
    await fixture.whenStable();
    expect(header?.classList.contains('open')).toBe(false);

    button?.click();
    await fixture.whenStable();
    expect(header?.classList.contains('open')).toBe(true);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();
    expect(header?.classList.contains('open')).toBe(false);
  });

  it('switches the theme and saves the choice', async () => {
    const { fixture, root, preferences } = await setup();
    const button = root.querySelector<HTMLButtonElement>('button.theme');

    expect(button?.getAttribute('aria-label')).toBe(DE_CONTENT.controls.themeToDark);
    expect(button?.querySelector('svg.moon')).not.toBeNull();

    button?.click();
    await fixture.whenStable();

    expect(preferences.setTheme).toHaveBeenCalledWith('dark');
    expect(button?.getAttribute('aria-label')).toBe(DE_CONTENT.controls.themeToLight);
    expect(button?.querySelector('svg.sun')).not.toBeNull();
  });
});
