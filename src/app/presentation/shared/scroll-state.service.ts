import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject, signal } from '@angular/core';

/** Scroll position facts for the header: shrunk state, progress bar and the section currently in view. */
@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private started = false;

  readonly scrolled = signal(false);
  readonly progress = signal(0);
  readonly activeSection = signal('home');

  start(sectionIds: readonly string[]): void {
    const win = this.doc.defaultView;
    if (this.started || !win) return;
    this.started = true;

    let frame = 0;
    const update = (): void => {
      frame = 0;
      const root = this.doc.documentElement;
      const max = root.scrollHeight - win.innerHeight;
      this.scrolled.set(win.scrollY > 40);
      this.progress.set(max > 0 ? Math.min(1, win.scrollY / max) : 0);
    };
    const onScroll = (): void => {
      if (!frame) frame = win.requestAnimationFrame(update);
    };

    win.addEventListener('scroll', onScroll, { passive: true });
    win.addEventListener('resize', onScroll);
    update();

    if (typeof IntersectionObserver !== 'undefined') {
      const spy = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.activeSection.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      for (const id of sectionIds) {
        const element = this.doc.getElementById(id);
        if (element) spy.observe(element);
      }
      this.destroyRef.onDestroy(() => spy.disconnect());
    }

    this.destroyRef.onDestroy(() => {
      win.removeEventListener('scroll', onScroll);
      win.removeEventListener('resize', onScroll);
    });
  }
}
