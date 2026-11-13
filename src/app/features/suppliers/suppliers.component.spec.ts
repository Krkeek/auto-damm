import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { BusinessRepository } from '@core/ports/business.repository';
import { SuppliersComponent } from '@features/suppliers/suppliers.component';
import { SECTION } from '@shared/constants/site-map.constants';

describe('SuppliersComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({ providers: [provideCore()] });
    const fixture = TestBed.createComponent(SuppliersComponent);
    await fixture.whenStable();
    const suppliers = TestBed.inject(BusinessRepository).getProfile().suppliers;
    return { root: fixture.nativeElement as HTMLElement, suppliers };
  }

  it('shows the title, the text and the quote', async () => {
    const { root } = await setup();

    expect(root.querySelector('section')?.id).toBe(SECTION.suppliers);
    expect(root.querySelector('h2')?.textContent).toBe(DE_CONTENT.suppliers.title);
    for (const paragraph of DE_CONTENT.suppliers.paragraphs) expect(root.textContent).toContain(paragraph);
    expect(root.querySelector('strong')?.textContent).toBe(DE_CONTENT.suppliers.highlight);
    expect(root.querySelector('blockquote')?.textContent).toBe(DE_CONTENT.suppliers.quote);
  });

  it('shows one named logo per supplier, with its pixel size', async () => {
    const { root, suppliers } = await setup();
    const logos = [...root.querySelectorAll<HTMLImageElement>('ul.logos:not([aria-hidden]) img')];

    expect(logos).toHaveLength(suppliers.length);
    suppliers.forEach((supplier, index) => {
      expect(logos[index].getAttribute('src')).toBe(supplier.logo);
      expect(logos[index].alt).toBe(supplier.name);
      expect(logos[index].getAttribute('width')).toBe(String(supplier.width));
      expect(logos[index].getAttribute('height')).toBe(String(supplier.height));
    });
  });

  it('repeats the logos once for the endless strip and hides the copy from screen readers', async () => {
    const { root, suppliers } = await setup();
    const lists = root.querySelectorAll('ul.logos');
    const copy = root.querySelector('ul.logos[aria-hidden="true"]');

    expect(lists).toHaveLength(2);
    expect(copy?.querySelectorAll('img')).toHaveLength(suppliers.length);
    for (const logo of copy?.querySelectorAll('img') ?? []) expect(logo.alt).toBe('');
  });
});
