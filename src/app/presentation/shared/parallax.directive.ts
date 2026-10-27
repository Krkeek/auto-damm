import { DOCUMENT } from '@angular/common';
import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

import { SystemPreferences } from '../../domain/ports/system-preferences';

/** Moves the photo inside its frame slightly slower than the page by setting `--py` while scrolling. */
@Directive({ selector: '[appParallax]' })
export class ParallaxDirective {
  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const win = inject(DOCUMENT).defaultView;
    const system = inject(SystemPreferences);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (!win || system.prefersReducedMotion) return;

      let frame = 0;
      const update = (): void => {
        frame = 0;
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > win.innerHeight) return;
        const offset = ((rect.top + rect.height / 2 - win.innerHeight / 2) / win.innerHeight) * -34;
        element.style.setProperty('--py', `${offset.toFixed(1)}px`);
      };
      const onScroll = (): void => {
        if (!frame) frame = win.requestAnimationFrame(update);
      };

      win.addEventListener('scroll', onScroll, { passive: true });
      win.addEventListener('resize', onScroll);
      update();

      destroyRef.onDestroy(() => {
        win.removeEventListener('scroll', onScroll);
        win.removeEventListener('resize', onScroll);
      });
    });
  }
}
