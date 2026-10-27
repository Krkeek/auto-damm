import { TestBed } from '@angular/core/testing';

import { CertificateViewerService } from '@features/dismantling/certificate-viewer.service';

describe('CertificateViewerService', () => {
  it('opens and closes an image', () => {
    const viewer = TestBed.inject(CertificateViewerService);
    expect(viewer.image()).toBeNull();

    viewer.open({ src: 'a.jpg', alt: 'A' });
    expect(viewer.image()).toEqual({ src: 'a.jpg', alt: 'A' });

    viewer.close();
    expect(viewer.image()).toBeNull();
  });
});
