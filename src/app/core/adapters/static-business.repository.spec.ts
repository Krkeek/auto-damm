import { StaticBusinessRepository } from '@core/adapters/static-business.repository';
import settings from '@core/content/owner-settings.json';

describe('StaticBusinessRepository', () => {
  it('takes phone, e-mail and opening hours from the owner settings file', () => {
    const profile = new StaticBusinessRepository().getProfile();

    expect(profile.phone).toEqual(settings.phone);
    expect(profile.whatsapp).toBe(settings.whatsapp);
    expect(profile.email).toBe(settings.email);
    expect(profile.schedules.shop.ranges).toEqual(settings.shopHours);
    expect(profile.schedules.yard.ranges).toEqual(settings.yardHours);
  });
});
