import { DE_CONTENT } from '@core/content/de.content';
import { StaticContentRepository } from '@core/adapters/static-content.repository';

describe('StaticContentRepository', () => {
  it('serves the German content', () => {
    expect(new StaticContentRepository().getContent()).toBe(DE_CONTENT);
  });
});
