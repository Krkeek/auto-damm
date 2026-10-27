import { isTheme } from '@core/models/theme.model';

describe('isTheme', () => {
  it.each(['light', 'dark'])('accepts %s', (value) => {
    expect(isTheme(value)).toBe(true);
  });

  it.each([null, undefined, '', 'Dark', 'system', 1])('rejects %s', (value) => {
    expect(isTheme(value)).toBe(false);
  });
});
