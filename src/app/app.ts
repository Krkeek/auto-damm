import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { LanguageStore } from './application/language.store';
import { ThemeStore } from './application/theme.store';
import { Footer } from './presentation/layout/footer';
import { Header } from './presentation/layout/header';
import { Contact } from './presentation/sections/contact';
import { Dismantling } from './presentation/sections/dismantling';
import { Hero } from './presentation/sections/hero';
import { History } from './presentation/sections/history';
import { Legal } from './presentation/sections/legal';
import { Services } from './presentation/sections/services';
import { Suppliers } from './presentation/sections/suppliers';
import { CertificateDialog } from './presentation/shared/certificate-dialog';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Services, History, Dismantling, Suppliers, Contact, Legal, Footer, CertificateDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-services />
      <app-history />
      <app-dismantling />
      <app-suppliers />
      <app-contact />
      <app-legal />
    </main>
    <app-footer />
    <app-certificate-dialog />
  `,
})
export class App {
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
