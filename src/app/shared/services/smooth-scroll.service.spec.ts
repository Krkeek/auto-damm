import { TestBed } from '@angular/core/testing';

import { SystemPreferences } from '@core/ports/system-preferences.port';
import { SmoothScrollService } from '@shared/services/smooth-scroll.service';

describe('SmoothScrollService', () => {
  let frames: FrameRequestCallback[];

  function setup(prefersReducedMotion: boolean): SmoothScrollService {
    TestBed.configureTestingModule({
      providers: [{ provide: SystemPreferences, useValue: { prefersReducedMotion } }],
    });
    return TestBed.inject(SmoothScrollService);
  }

  function runFrames(...times: number[]): void {
    for (const time of times) frames.shift()?.(time);
  }

  beforeEach(() => {
    frames = [];
    document.body.innerHTML = '<header></header><section id="home"></section><section id="contact"></section>';
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => frames.push(callback));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('jumps without animation when the visitor prefers reduced motion', () => {
    setup(true).to('home');
    expect(window.scrollTo).toHaveBeenCalledExactlyOnceWith(0, 0);
    expect(location.hash).toBe('#home');
  });

  it('ignores unknown sections', () => {
    setup(true).to('missing');
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('animates to the target section', () => {
    const contact = document.getElementById('contact') as HTMLElement;
    vi.spyOn(contact, 'getBoundingClientRect').mockReturnValue({ top: 1000 } as DOMRect);

    setup(false).to('contact');
    runFrames(0, 400, 10_000);

    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 1000);
    expect(frames).toHaveLength(0);
  });

  it('stops animating when the visitor scrolls', () => {
    const service = setup(false);
    service.to('contact');
    runFrames(0);
    window.dispatchEvent(new Event('wheel'));
    runFrames(400);

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
