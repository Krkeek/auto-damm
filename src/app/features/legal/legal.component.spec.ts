import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { BusinessRepository } from '@core/ports/business.repository';
import { LegalComponent } from '@features/legal/legal.component';
import { SECTION } from '@shared/constants/site-map.constants';

describe('LegalComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({ providers: [provideCore()] });
    const fixture = TestBed.createComponent(LegalComponent);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;
    const profile = TestBed.inject(BusinessRepository).getProfile();
    return {
      imprint: root.querySelector(`#${SECTION.imprint}`),
      privacy: root.querySelector(`#${SECTION.privacy}`),
      profile,
    };
  }

  it('names the responsible person, the address and the register entry', async () => {
    const { imprint, profile } = await setup();
    const text = imprint?.textContent ?? '';

    expect(imprint?.querySelector('h2')?.textContent).toBe(DE_CONTENT.legal.imprint.title);
    for (const fact of [profile.owner, profile.tradeName, profile.street, profile.postalCode, profile.city]) {
      expect(text).toContain(fact);
    }
    expect(text).toContain(`${DE_CONTENT.legal.imprint.registerLabel} ${profile.registerNumber}`);
    expect(text).toContain(`${DE_CONTENT.legal.imprint.courtLabel} ${profile.registerCourt}`);
    expect(text).toContain(profile.vatId);
  });

  it('links phone, e-mail and the EU dispute resolution platform', async () => {
    const { imprint, profile } = await setup();

    expect(imprint?.querySelector(`a[href="tel:${profile.phone.e164}"]`)).not.toBeNull();
    expect(imprint?.querySelector(`a[href="mailto:${profile.email}"]`)?.textContent).toBe(profile.email);
    expect(imprint?.querySelector(`a[href="${profile.odrUrl}"]`)?.textContent).toBe(profile.odrUrl);
  });

  it('shows the dispute resolution notices', async () => {
    const { imprint } = await setup();
    const headings = [...(imprint?.querySelectorAll('h3') ?? [])].map((heading) => heading.textContent);

    expect(headings).toEqual([
      DE_CONTENT.legal.imprint.contactTitle,
      DE_CONTENT.legal.imprint.vatTitle,
      DE_CONTENT.legal.imprint.odrTitle,
      DE_CONTENT.legal.imprint.consumerTitle,
    ]);
    expect(imprint?.textContent).toContain(DE_CONTENT.legal.imprint.consumerText);
  });

  it('has a separate privacy policy section', async () => {
    const { privacy } = await setup();

    expect(privacy?.querySelector('h2')?.textContent).toBe(DE_CONTENT.legal.privacy.title);
    expect(privacy?.querySelector('p')?.textContent).toBe(DE_CONTENT.legal.privacy.text);
  });
});
