import { DestroyRef, Directive, ElementRef, afterNextRender, computed, inject, input, signal } from '@angular/core';

/**
 * Adds the `show` class once the element scrolls into view; the animation itself lives in styles.css.
 * Use `appRevealDelay` (ms) to stagger siblings.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    '[class.show]': 'visible()',
    '[style.--d]': 'delayCss()',
  },
})
export class RevealDirective {
  readonly appRevealDelay = input(0);

  protected readonly visible = signal(false);
  protected readonly delayCss = computed(() => `${this.appRevealDelay()}ms`);

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
