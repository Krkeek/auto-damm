import { TestBed } from '@angular/core/testing';

import { LocalStoragePreferencesRepository } from '@core/adapters/local-storage-preferences.repository';

describe('LocalStoragePreferencesRepository', () => {
  let repository: LocalStoragePreferencesRepository;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [LocalStoragePreferencesRepository] });
    repository = TestBed.inject(LocalStoragePreferencesRepository);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns null when nothing is stored', () => {
    expect(repository.getTheme()).toBeNull();
  });

  it('stores and reads the theme', () => {
    repository.setTheme('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(repository.getTheme()).toBe('dark');
  });

  it('ignores invalid stored values', () => {
    localStorage.setItem('theme', 'purple');
    expect(repository.getTheme()).toBeNull();
  });

  it('does not throw when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });

    expect(repository.getTheme()).toBeNull();
    expect(() => {
      repository.setTheme('light');
    }).not.toThrow();
  });
});
