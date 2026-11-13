import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { ServicesComponent } from '@features/services/services.component';
import { IMAGES, SECTION } from '@shared/constants/site-map.constants';

describe('ServicesComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({ providers: [provideCore()] });
    const fixture = TestBed.createComponent(ServicesComponent);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the parts shop first and the recycling yard second, on a dark background', async () => {
    const root = await setup();
    const blocks = [...root.querySelectorAll('.svc')];

    expect(root.querySelector('section')?.id).toBe(SECTION.services);
    expect(blocks).toHaveLength(2);
    expect(blocks[0].querySelector('h2')?.textContent).toBe(DE_CONTENT.services.shop.title);
    expect(blocks[0].classList.contains('dark')).toBe(false);
    expect(blocks[1].querySelector('h2')?.textContent).toBe(DE_CONTENT.services.yard.title);
    expect(blocks[1].classList.contains('dark')).toBe(true);
  });

  it('lists every service of each block', async () => {
    const root = await setup();
    const [shop, yard] = [...root.querySelectorAll('.svc')];

    expect([...shop.querySelectorAll('li')].map((item) => item.textContent)).toEqual(DE_CONTENT.services.shop.items);
    expect([...yard.querySelectorAll('li')].map((item) => item.textContent)).toEqual(DE_CONTENT.services.yard.items);
  });

  it('gives each photo its source and alternative text', async () => {
    const root = await setup();
    const [shop, yard] = [...root.querySelectorAll<HTMLImageElement>('img.ph')];

    expect(shop.getAttribute('src')).toBe(IMAGES.shop);
    expect(shop.alt).toBe(DE_CONTENT.services.shop.imageAlt);
    expect(yard.getAttribute('src')).toBe(IMAGES.yard);
    expect(yard.alt).toBe(DE_CONTENT.services.yard.imageAlt);
  });
});
