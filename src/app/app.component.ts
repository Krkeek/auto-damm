import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { LanguageStore } from '@core/state/language.store';
import { ThemeStore } from '@core/state/theme.store';
import { FooterComponent } from '@layout/footer/footer.component';
import { HeaderComponent } from '@layout/header/header.component';
import { ContactComponent } from '@features/contact/contact.component';
import { DismantlingComponent } from '@features/dismantling/dismantling.component';
import { HeroComponent } from '@features/hero/hero.component';
import { HistoryComponent } from '@features/history/history.component';
import { LegalComponent } from '@features/legal/legal.component';
import { ServicesComponent } from '@features/services/services.component';
import { SuppliersComponent } from '@features/suppliers/suppliers.component';
import { CertificateDialogComponent } from '@features/dismantling/certificate-dialog/certificate-dialog.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    HistoryComponent,
    DismantlingComponent,
    SuppliersComponent,
    ContactComponent,
    LegalComponent,
    FooterComponent,
    CertificateDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor() {
    const doc = inject(DOCUMENT);
    const language = inject(LanguageStore);
    const theme = inject(ThemeStore);
    const title = inject(Title);
    const meta = inject(Meta);
    const root = doc.documentElement;

    // Keep <html lang>, the page title and the description in step with the chosen language.
    effect(() => {
      const content = language.content();
      root.lang = language.language();
      title.setTitle(content.meta.title);
      meta.updateTag({ name: 'description', content: content.meta.description });
    });

    // Reflect the chosen theme on <html>; fade colours only when the visitor switches, not on load.
    let firstRun = true;
    effect(() => {
      const preference = theme.preference();
      if (preference) root.setAttribute('data-theme', preference);
      else root.removeAttribute('data-theme');

      if (!firstRun) {
        root.classList.add('tt');
        setTimeout(() => root.classList.remove('tt'), 500);
      }
      firstRun = false;
    });
  }
}
