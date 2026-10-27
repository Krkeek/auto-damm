import { Injectable, signal } from '@angular/core';

export interface ViewerImage {
  readonly src: string;
  readonly alt: string;
}

/** UI state: which certificate is open in the large view. */
@Injectable({ providedIn: 'root' })
export class CertificateViewerService {
  readonly image = signal<ViewerImage | null>(null);

  open(image: ViewerImage): void {
    this.image.set(image);
  }

  close(): void {
    this.image.set(null);
  }
}
