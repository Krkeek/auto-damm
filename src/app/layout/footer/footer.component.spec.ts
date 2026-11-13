import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { BusinessRepository } from '@core/ports/business.repository';
import { FooterComponent } from '@layout/footer/footer.component';
import { SECTION } from '@shared/constants/site-map.constants';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';

describe('FooterComponent', () => {
  async function setup() {
    const smoothScroll = { to: vi.fn() };
    TestBed.configureTestingModule({
      providers: [provideCore(), { provide: SmoothScrollService, useValue: smoothScroll }],
    });
    const fixture = TestBed.createComponent(FooterComponent);
    await fixture.whenStable();
    return { root: fixture.nativeElement as HTMLElement, smoothScroll };
  }

  it('names the company and links to imprint, privacy policy and contact', async () => {
    const { root } = await setup();
    const links = [...root.querySelectorAll<HTMLAnchorElement>('footer a')];

    expect(root.textContent).toContain(TestBed.inject(BusinessRepository).getProfile().groupName);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      `#${SECTION.imprint}`,
      `#${SECTION.privacy}`,
      `#${SECTION.contact}`,
    ]);
    expect(links.map((link) => link.textContent.trim())).toEqual([
      DE_CONTENT.footer.imprint,
      DE_CONTENT.footer.privacy,
      DE_CONTENT.footer.contact,
    ]);
  });

  it('scrolls smoothly to the linked section', async () => {
    const { root, smoothScroll } = await setup();
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });

    root.querySelector(`a[href="#${SECTION.privacy}"]`)?.dispatchEvent(click);

    expect(click.defaultPrevented).toBe(true);
    expect(smoothScroll.to).toHaveBeenCalledWith(SECTION.privacy);
  });
});
