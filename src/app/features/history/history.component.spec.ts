import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { HistoryComponent } from '@features/history/history.component';
import { IMAGES, SECTION } from '@shared/constants/site-map.constants';

describe('HistoryComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({ providers: [provideCore()] });
    const fixture = TestBed.createComponent(HistoryComponent);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the section title and the street photo', async () => {
    const root = await setup();
    const photo = root.querySelector<HTMLImageElement>('img.ph');

    expect(root.querySelector('section')?.id).toBe(SECTION.history);
    expect(root.querySelector('h2')?.textContent).toBe(DE_CONTENT.history.title);
    expect(photo?.getAttribute('src')).toBe(IMAGES.street);
    expect(photo?.alt).toBe(DE_CONTENT.history.imageAlt);
  });

  it('lists the key points and tells the company history', async () => {
    const root = await setup();

    expect([...root.querySelectorAll('.hist li')].map((item) => item.textContent)).toEqual(DE_CONTENT.history.items);
    expect(root.querySelector('.hist h3')?.textContent).toBe(DE_CONTENT.history.subtitle);
    expect([...root.querySelectorAll('.hist p')].map((paragraph) => paragraph.textContent)).toEqual(
      DE_CONTENT.history.paragraphs,
    );
  });
});
