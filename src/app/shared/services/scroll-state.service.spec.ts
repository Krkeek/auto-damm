import { TestBed } from '@angular/core/testing';

import { ScrollStateService } from '@shared/services/scroll-state.service';

describe('ScrollStateService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('tracks whether the page is scrolled and how far', () => {
    let frame: FrameRequestCallback | undefined;
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frame = callback;
      return 1;
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 2000 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 });

    const service = TestBed.inject(ScrollStateService);
    service.start([]);
    expect(service.scrolled()).toBe(false);
    expect(service.progress()).toBe(0);

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 });
    window.dispatchEvent(new Event('scroll'));
    frame?.(0);

    expect(service.scrolled()).toBe(true);
    expect(service.progress()).toBe(0.5);
  });
});
