import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, viewChild } from '@angular/core';

import { LanguageStore } from '@core/state/language.store';
import { CertificateViewerService } from '@features/dismantling/certificate-viewer.service';

@Component({
  selector: 'app-certificate-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './certificate-dialog.component.html',
})
export class CertificateDialogComponent {
  protected readonly viewer = inject(CertificateViewerService);
  protected readonly content = inject(LanguageStore).content;

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const wantsOpen = this.viewer.image() !== null;
      const element = this.dialog().nativeElement;
      if (wantsOpen && !element.open) element.showModal();
      if (!wantsOpen && element.open) element.close();
    });
  }

  protected closeOnBackdrop(event: MouseEvent): void {
    const element = this.dialog().nativeElement;
    if (event.target === element) element.close();
  }
}
