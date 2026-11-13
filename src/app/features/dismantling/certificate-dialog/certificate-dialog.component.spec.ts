import { TestBed } from '@angular/core/testing';

import { DE_CONTENT } from '@core/content/de.content';
import { provideCore } from '@core/core.providers';
import { CertificateDialogComponent } from '@features/dismantling/certificate-dialog/certificate-dialog.component';
import { CertificateViewerService } from '@features/dismantling/certificate-viewer.service';

describe('CertificateDialogComponent', () => {
  const image = { src: 'images/cert.jpg', alt: 'Zertifikat' };

  beforeEach(() => {
    // jsdom has no <dialog> behaviour.
    HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
  });

  async function setup() {
    TestBed.configureTestingModule({ providers: [provideCore()] });
    const fixture = TestBed.createComponent(CertificateDialogComponent);
    await fixture.whenStable();
    const dialog = (fixture.nativeElement as HTMLElement).querySelector('dialog');
    if (!dialog) throw new Error('dialog not found');
    return { fixture, dialog, viewer: TestBed.inject(CertificateViewerService) };
  }

  it('stays closed and empty until a certificate is chosen', async () => {
    const { dialog } = await setup();

    expect(dialog.open).toBe(false);
    expect(dialog.querySelector('img')).toBeNull();
    expect(dialog.getAttribute('aria-label')).toBe(DE_CONTENT.controls.dialogLabel);
  });

  it('opens with the chosen certificate', async () => {
    const { fixture, dialog, viewer } = await setup();

    viewer.open(image);
    await fixture.whenStable();

    expect(dialog.open).toBe(true);
    expect(dialog.querySelector('img')?.getAttribute('src')).toBe(image.src);
    expect(dialog.querySelector('img')?.alt).toBe(image.alt);
  });

  it('closes from the close button and clears the viewer', async () => {
    const { fixture, dialog, viewer } = await setup();
    viewer.open(image);
    await fixture.whenStable();

    const button = dialog.querySelector<HTMLButtonElement>('button.x');
    expect(button?.textContent).toBe(DE_CONTENT.controls.close);
    button?.click();
    await fixture.whenStable();

    expect(dialog.open).toBe(false);
    expect(viewer.image()).toBeNull();
  });

  it('closes on a click on the backdrop, but not on the picture', async () => {
    const { fixture, dialog, viewer } = await setup();
    viewer.open(image);
    await fixture.whenStable();

    dialog.querySelector('img')?.click();
    await fixture.whenStable();
    expect(dialog.open).toBe(true);

    dialog.click();
    await fixture.whenStable();
    expect(dialog.open).toBe(false);
    expect(viewer.image()).toBeNull();
  });

  it('closes when the viewer is cleared from outside', async () => {
    const { fixture, dialog, viewer } = await setup();
    viewer.open(image);
    await fixture.whenStable();

    viewer.close();
    await fixture.whenStable();

    expect(dialog.open).toBe(false);
  });
});
