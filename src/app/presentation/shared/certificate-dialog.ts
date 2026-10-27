import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, viewChild } from '@angular/core';

import { LanguageStore } from '../../application/language.store';
import { CertificateViewerService } from './certificate-viewer.service';

@Component({
  selector: 'app-certificate-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog
      #dialog
      [attr.aria-label]="content().controls.dialogLabel"
      (click)="closeOnBackdrop($event)"
      (close)="viewer.close()"
    >
      <button class="x" type="button" (click)="dialog.close()">{{ content().controls.close }}</button>
      @if (viewer.image(); as image) {
        <img [src]="image.src" [alt]="image.alt" />
      }
    </dialog>
  `,
})
export class CertificateDialog {
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
