import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { BusinessTime } from '@core/models/opening-hours.model';
import { BusinessRepository } from '@core/ports/business.repository';
import { Clock } from '@core/ports/clock.port';
import { IsOpenUseCase } from '@core/use-cases/is-open.use-case';
import { HeroComponent } from '@features/hero/hero.component';
import { SECTION } from '@shared/constants/site-map.constants';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';

describe('HeroComponent', () => {
  async function setup(now: BusinessTime) {
    const smoothScroll = { to: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        provideCore(),
        IsOpenUseCase,
        { provide: Clock, useValue: { now: () => now } },
        { provide: SmoothScrollService, useValue: smoothScroll },
      ],
    });
    const fixture = TestBed.createComponent(HeroComponent);
    await fixture.whenStable();
    const profile = TestBed.inject(BusinessRepository).getProfile();
    return { root: fixture.nativeElement as HTMLElement, profile, smoothScroll };
  }

  const tuesdayAfternoon: BusinessTime = { weekday: 'Tue', minutesOfDay: 14 * 60 };

  it('shows the headline and the lead text', async () => {
    const { root } = await setup(tuesdayAfternoon);

    expect(root.querySelector('h1')?.textContent).toBe(DE_CONTENT.hero.title);
    expect(root.querySelector('.lead')?.textContent).toBe(DE_CONTENT.hero.lead);
  });

  it('offers a call, a WhatsApp chat and directions', async () => {
    const { root, profile } = await setup(tuesdayAfternoon);
    const call = root.querySelector<HTMLAnchorElement>('a.btn.primary');
    const whatsapp = root.querySelector<HTMLAnchorElement>('a.whatsapp');
    const route = root.querySelector<HTMLAnchorElement>('a.route');

    expect(call?.getAttribute('href')).toBe(`tel:${profile.phone.e164}`);
    expect(call?.textContent).toContain(profile.phone.display);

    expect(whatsapp?.getAttribute('href')).toBe('https://wa.me/49372066070');
    expect(whatsapp?.getAttribute('target')).toBe('_blank');
    expect(whatsapp?.getAttribute('aria-label')).toBe(DE_CONTENT.hero.whatsapp);

    expect(route?.getAttribute('href')).toContain('https://www.google.com/maps/dir/');
    expect(route?.textContent.trim()).toBe(DE_CONTENT.hero.route);
  });

  it('keeps the call and WhatsApp buttons together, with directions after them', async () => {
    const { root } = await setup(tuesdayAfternoon);
    const pair = root.querySelector('.btn-pair');

    expect(pair?.querySelector('a.btn.primary')).not.toBeNull();
    expect(pair?.querySelector('a.whatsapp')).not.toBeNull();
    expect(pair?.nextElementSibling?.classList.contains('route')).toBe(true);
  });

  it('reports shop and yard as open during opening hours', async () => {
    const { root } = await setup(tuesdayAfternoon);
    const states = [...root.querySelectorAll('.state')];

    expect(states).toHaveLength(2);
    for (const state of states) {
      expect(state.classList.contains('open')).toBe(true);
      expect(state.textContent.trim()).toBe(DE_CONTENT.hero.open);
    }
  });

  it('reports the yard as closed on Saturday while the shop is open', async () => {
    const { root } = await setup({ weekday: 'Sat', minutesOfDay: 10 * 60 });
    const [shop, yard] = [...root.querySelectorAll('.state')];

    expect(shop.classList.contains('open')).toBe(true);
    expect(yard.classList.contains('closed')).toBe(true);
    expect(yard.textContent.trim()).toBe(DE_CONTENT.hero.closed);
  });

  it('scrolls to the services when the arrow at the bottom is clicked', async () => {
    const { root, smoothScroll } = await setup(tuesdayAfternoon);
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });

    root.querySelector('a.cue')?.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(smoothScroll.to).toHaveBeenCalledWith(SECTION.services);
  });
});
