import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { BusinessRepository } from '@core/ports/business.repository';
import { CertificateViewerService } from '@features/dismantling/certificate-viewer.service';
import { DismantlingComponent } from '@features/dismantling/dismantling.component';
import { SECTION } from '@shared/constants/site-map.constants';

describe('DismantlingComponent', () => {
  async function setup() {
    TestBed.configureTestingModule({ providers: [provideCore()] });
    const fixture = TestBed.createComponent(DismantlingComponent);
    await fixture.whenStable();
    const certificates = TestBed.inject(BusinessRepository).getProfile().certificates;
    return { root: fixture.nativeElement as HTMLElement, certificates };
  }

  it('shows the title and both introduction paragraphs', async () => {
    const { root } = await setup();

    expect(root.querySelector('section')?.id).toBe(SECTION.dismantling);
    expect(root.querySelector('h2')?.textContent).toBe(DE_CONTENT.dismantling.title);
    expect(root.textContent).toContain(DE_CONTENT.dismantling.intro);
    expect(root.textContent).toContain(DE_CONTENT.dismantling.note);
  });

  it('shows every certificate with its caption', async () => {
    const { root, certificates } = await setup();
    const figures = [...root.querySelectorAll('.certs figure')];

    expect(figures).toHaveLength(certificates.length);
    certificates.forEach((certificate, index) => {
      const text = DE_CONTENT.certificates[certificate.id];
      const image = figures[index].querySelector('img');
      expect(image?.getAttribute('src')).toBe(certificate.image);
      expect(image?.alt).toBe(text.alt);
      expect(figures[index].querySelector('figcaption')?.textContent).toBe(text.caption);
    });
  });

  it('opens the clicked certificate in the large view', async () => {
    const { root, certificates } = await setup();
    const viewer = TestBed.inject(CertificateViewerService);
    const second = certificates[1];

    expect(viewer.image()).toBeNull();
    root.querySelectorAll<HTMLButtonElement>('.certs button')[1].click();

    expect(viewer.image()).toEqual({ src: second.image, alt: DE_CONTENT.certificates[second.id].alt });
  });
});
