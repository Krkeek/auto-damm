import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { DE_CONTENT } from '@core/content/de.content';
import { CertificateViewerService } from '@features/dismantling/certificate-viewer.service';
import { ALL_SECTION_IDS } from '@shared/constants/site-map.constants';

describe('AppComponent', () => {
  beforeEach(() => {
    // jsdom has no <dialog> behaviour.
    HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    };
    TestBed.configureTestingModule({ providers: appConfig.providers });
  });

  it('renders every section', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const root = fixture.nativeElement as HTMLElement;

    for (const id of ALL_SECTION_IDS) {
      expect(root.querySelector(`#${id}`), id).not.toBeNull();
    }
    expect(root.textContent).toContain(DE_CONTENT.nav.contact);
  });

  it('sets the page title and description', () => {
    TestBed.createComponent(AppComponent);
    expect(TestBed.inject(Title).getTitle()).toBe(DE_CONTENT.meta.title);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe(DE_CONTENT.meta.description);
  });

  it('toggles the theme from the icon button in the header', async () => {
    localStorage.setItem('theme', 'light');
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('header button.theme');
    if (!button) throw new Error('theme button not found');

    expect(button.textContent.trim()).toBe('');
    expect(button.getAttribute('aria-label')).toBe(DE_CONTENT.controls.themeToDark);
    expect(button.querySelector('svg.moon')?.getAttribute('aria-hidden')).toBe('true');

    button.click();
    await fixture.whenStable();

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(button.getAttribute('aria-label')).toBe(DE_CONTENT.controls.themeToLight);
    expect(button.querySelector('svg.sun')).not.toBeNull();
    expect(button.querySelector('svg.moon')).toBeNull();
    localStorage.clear();
  });

  it('opens and closes the certificate dialog', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const dialog = (fixture.nativeElement as HTMLElement).querySelector('dialog') as HTMLDialogElement;

    TestBed.inject(CertificateViewerService).open({ src: 'cert.jpg', alt: 'Zertifikat' });
    await fixture.whenStable();
    expect(dialog.open).toBe(true);
    expect(dialog.querySelector('img')?.getAttribute('src')).toBe('cert.jpg');

    dialog.querySelector<HTMLButtonElement>('button.x')?.click();
    await fixture.whenStable();
    expect(dialog.open).toBe(false);
    expect(TestBed.inject(CertificateViewerService).image()).toBeNull();
  });
});
