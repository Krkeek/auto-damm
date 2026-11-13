import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { BusinessTime } from '@core/models/opening-hours.model';
import { Clock } from '@core/ports/clock.port';
import { HoursOnDayUseCase } from '@core/use-cases/hours-on-day.use-case';
import { IsOpenUseCase } from '@core/use-cases/is-open.use-case';
import { NextChangeUseCase } from '@core/use-cases/next-change.use-case';
import { OpeningHoursComponent } from '@features/hero/opening-hours/opening-hours.component';

describe('OpeningHoursComponent', () => {
  async function setup(now: BusinessTime) {
    TestBed.configureTestingModule({
      providers: [
        provideCore(),
        IsOpenUseCase,
        HoursOnDayUseCase,
        NextChangeUseCase,
        { provide: Clock, useValue: { now: () => now } },
      ],
    });
    const fixture = TestBed.createComponent(OpeningHoursComponent);
    await fixture.whenStable();
    return { root: fixture.nativeElement as HTMLElement, fixture };
  }

  const tuesdayAfternoon: BusinessTime = { weekday: 'Tue', minutesOfDay: 14 * 60 };
  const saturdayMorning: BusinessTime = { weekday: 'Sat', minutesOfDay: 10 * 60 };

  const text = (element: Element | null | undefined) => element?.textContent.replace(/\s+/g, ' ').trim();
  const dayButton = (root: HTMLElement, label: string) =>
    [...root.querySelectorAll<HTMLButtonElement>('button.day')].find((button) => text(button) === label);

  it('shows the title and the holiday note', async () => {
    const { root } = await setup(tuesdayAfternoon);

    expect(root.querySelector('h2')?.textContent).toBe(DE_CONTENT.hero.liveTitle);
    expect(root.querySelector('.note')?.textContent).toBe(DE_CONTENT.hero.note);
  });

  it('offers a button for every weekday with today selected', async () => {
    const { root } = await setup(tuesdayAfternoon);
    const days = [...root.querySelectorAll<HTMLButtonElement>('button.day')];
    const selected = days.filter((day) => day.getAttribute('aria-pressed') === 'true');

    expect(days.map(text)).toEqual(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']);
    expect(selected.map(text)).toEqual(['Di']);
    expect(selected[0].classList.contains('today')).toBe(true);
    expect(selected[0].getAttribute('aria-label')).toBe(DE_CONTENT.hero.today(DE_CONTENT.hero.dayNames.Tue));
    expect(dayButton(root, 'Mi')?.getAttribute('aria-label')).toBe(DE_CONTENT.hero.dayNames.Wed);
  });

  it("shows today's hours and reports shop and yard as open", async () => {
    const { root } = await setup(tuesdayAfternoon);
    const [shop, yard] = [...root.querySelectorAll('.row')];

    expect(text(shop.querySelector('.hours'))).toBe('9–18 Uhr');
    expect(text(yard.querySelector('.hours'))).toBe('10–17 Uhr');
    expect(shop.querySelector('.state')?.classList.contains('open')).toBe(true);
    expect(text(shop.querySelector('.state'))).toBe('Geöffnet · schließt um 18 Uhr');
    expect(text(yard.querySelector('.state'))).toBe('Geöffnet · schließt um 17 Uhr');
  });

  it('reports the yard as closed on Saturday while the shop is open', async () => {
    const { root } = await setup(saturdayMorning);
    const [shop, yard] = [...root.querySelectorAll('.row')];

    expect(text(shop.querySelector('.hours'))).toBe('9–12 Uhr');
    expect(text(shop.querySelector('.state'))).toBe('Geöffnet · schließt um 12 Uhr');
    expect(text(yard.querySelector('.hours'))).toBe(DE_CONTENT.hero.byAppointment);
    expect(yard.querySelector('.state')?.classList.contains('closed')).toBe(true);
    expect(text(yard.querySelector('.state'))).toBe('Geschlossen · öffnet Mo um 10 Uhr');
  });

  it('says when the shop opens later today and tomorrow', async () => {
    const early = await setup({ weekday: 'Mon', minutesOfDay: 7 * 60 });
    expect(text(early.root.querySelector('.row .state'))).toBe('Geschlossen · öffnet um 9 Uhr');

    TestBed.resetTestingModule();
    const late = await setup({ weekday: 'Mon', minutesOfDay: 19 * 60 });
    expect(text(late.root.querySelector('.row .state'))).toBe('Geschlossen · öffnet morgen um 9 Uhr');
  });

  it('shows the hours of another day without the live status when that day is picked', async () => {
    const { root, fixture } = await setup(tuesdayAfternoon);

    dayButton(root, 'So')?.click();
    await fixture.whenStable();
    const [shop, yard] = [...root.querySelectorAll('.row')];

    expect(dayButton(root, 'So')?.getAttribute('aria-pressed')).toBe('true');
    expect(dayButton(root, 'Di')?.getAttribute('aria-pressed')).toBe('false');
    expect(dayButton(root, 'Di')?.classList.contains('today')).toBe(true);
    expect(text(shop.querySelector('.hours'))).toBe(DE_CONTENT.hero.closed);
    expect(text(yard.querySelector('.hours'))).toBe(DE_CONTENT.hero.byAppointment);
    expect(text(shop.querySelector('.state'))).toBe('');

    dayButton(root, 'Di')?.click();
    await fixture.whenStable();

    expect(text(root.querySelector('.row .state'))).toBe('Geöffnet · schließt um 18 Uhr');
  });
});
