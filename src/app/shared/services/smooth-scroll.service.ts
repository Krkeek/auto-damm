import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { SystemPreferences } from '@core/ports/system-preferences.port';

const easeInOutCubic = (p: number): number => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

/** Animated scrolling to a section. Stops as soon as the visitor scrolls or presses a key. */
@Injectable({ providedIn: 'root' })
export class SmoothScrollService {
  private readonly doc = inject(DOCUMENT);
  private readonly system = inject(SystemPreferences);
  private run = 0;

  constructor() {
    const win = this.doc.defaultView;
    for (const type of ['wheel', 'touchstart', 'keydown']) {
      win?.addEventListener(type, () => this.run++, { passive: true });
    }
  }

  to(id: string): void {
    const win = this.doc.defaultView;
    const element = this.doc.getElementById(id);
    if (!win || !element) return;

    const target = this.targetY(win, element, id);
    const from = win.scrollY;
    const delta = target - from;
    const duration = this.system.prefersReducedMotion ? 0 : Math.min(1200, Math.max(650, Math.abs(delta) * 0.55));

    try {
      win.history.replaceState(null, '', `#${id}`);
    } catch {
      // Some embedded contexts forbid history changes; scrolling still works.
    }

    if (duration === 0) {
      win.scrollTo(0, target);
      return;
    }

    const token = ++this.run;
    let start = 0;
    const step = (time: number): void => {
      if (token !== this.run) return;
      start ||= time;
      const progress = Math.min(1, (time - start) / duration);
      win.scrollTo(0, from + delta * easeInOutCubic(progress));
      if (progress < 1) win.requestAnimationFrame(step);
    };
    win.requestAnimationFrame(step);
  }

  private targetY(win: Window, element: HTMLElement, id: string): number {
    if (id === 'home') return 0;
    const header = this.doc.querySelector('header');
    const heading = element.querySelector<HTMLElement>('.st');
    const anchor = heading ?? element;
    const offset = (header?.offsetHeight ?? 0) + (heading ? 36 : 0);
    return Math.max(0, Math.round(anchor.getBoundingClientRect().top + win.scrollY - offset));
  }
}
