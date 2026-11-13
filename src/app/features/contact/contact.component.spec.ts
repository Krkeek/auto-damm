import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { BusinessRepository } from '@core/ports/business.repository';
import { ContactComponent } from '@features/contact/contact.component';
import { SECTION } from '@shared/constants/site-map.constants';

describe('ContactComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({ providers: [provideCore()] });
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();
    const profile = TestBed.inject(BusinessRepository).getProfile();
    return { fixture, root: fixture.nativeElement as HTMLElement, profile };
  }

  it('shows the address with phone and e-mail links', async () => {
    const { root, profile } = await setup();
    const address = root.querySelector('address')?.textContent ?? '';

    expect(root.querySelector('section')?.id).toBe(SECTION.contact);
    expect(root.querySelector('h2')?.textContent).toBe(DE_CONTENT.contact.title);
    expect(address).toContain(profile.tradeName);
    expect(address).toContain(profile.street);
    expect(address).toContain(`${profile.postalCode} ${profile.city}`);

    const phone = root.querySelector<HTMLAnchorElement>('a.tel');
    expect(phone?.getAttribute('href')).toBe(`tel:${profile.phone.e164}`);
    expect(phone?.textContent).toBe(profile.phone.display);
    expect(root.querySelector(`a[href="mailto:${profile.email}"]`)?.textContent).toBe(profile.email);
  });

  it('lists the opening hours', async () => {
    const { root } = await setup();
    const rows = [...root.querySelectorAll('table tr')].map((row) => ({
      label: row.querySelector('th')?.textContent,
      value: row.querySelector('td')?.textContent,
    }));

    expect(root.querySelector('caption')?.textContent.trim()).toBe(DE_CONTENT.contact.hoursTitle);
    expect(rows).toEqual(DE_CONTENT.contact.hours.map(({ label, value }) => ({ label, value })));
  });

  it('does not contact Google until the visitor asks for the map', async () => {
    const { root } = await setup();

    expect(root.querySelector('iframe')).toBeNull();
    expect(root.querySelector('.map')?.classList.contains('loaded')).toBe(false);
    expect(root.querySelector('.map p')?.textContent).toBe(DE_CONTENT.contact.map.text);
    expect(root.querySelector('.map a.btn')?.getAttribute('href')).toContain('https://www.google.com/maps/search/');
  });

  it('loads the embedded map after a click on the button', async () => {
    const { fixture, root } = await setup();

    root.querySelector<HTMLButtonElement>('.map button.btn')?.click();
    await fixture.whenStable();

    const frame = root.querySelector('iframe');
    expect(root.querySelector('.map')?.classList.contains('loaded')).toBe(true);
    expect(frame?.getAttribute('src')).toContain('output=embed');
    expect(frame?.getAttribute('title')).toBe(DE_CONTENT.contact.map.title);
    expect(root.querySelector('.map button.btn')).toBeNull();
  });
});
