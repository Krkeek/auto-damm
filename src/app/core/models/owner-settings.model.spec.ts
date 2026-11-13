import { parseOwnerSettings } from '@core/models/owner-settings.model';

function valid() {
  return {
    phone: { display: '037206 / 6070', e164: '+49372066070' },
    whatsapp: '+49372066070',
    email: 'info@auto-damm.de',
    shopHours: [{ days: ['Mon', 'Tue'], fromHour: 9, toHour: 18 }],
    yardHours: [] as unknown[],
    team: [{ name: 'Heine', days: ['Mon'] }],
  };
}

describe('parseOwnerSettings', () => {
  it('returns valid settings unchanged', () => {
    expect(parseOwnerSettings(valid())).toEqual(valid());
  });

  it.each([
    ['settings', null],
    ['settings', []],
    ['phone', { ...valid(), phone: '037206 / 6070' }],
    ['phone.display', { ...valid(), phone: { display: ' ', e164: '+49372066070' } }],
    ['phone.e164', { ...valid(), phone: { display: '037206 / 6070', e164: '037206 6070' } }],
    ['whatsapp', { ...valid(), whatsapp: 49372066070 }],
    ['email', { ...valid(), email: 'info@auto-damm' }],
    ['shopHours', { ...valid(), shopHours: 'Mo-Fr 9-18' }],
    ['shopHours[0]', { ...valid(), shopHours: ['Mo-Fr 9-18'] }],
    ['shopHours[0].days', { ...valid(), shopHours: [{ days: [], fromHour: 9, toHour: 18 }] }],
    ['shopHours[0].days[0]', { ...valid(), shopHours: [{ days: ['Montag'], fromHour: 9, toHour: 18 }] }],
    ['shopHours[0].fromHour', { ...valid(), shopHours: [{ days: ['Mon'], fromHour: 9.5, toHour: 18 }] }],
    ['shopHours[0].toHour', { ...valid(), shopHours: [{ days: ['Mon'], fromHour: 9, toHour: 25 }] }],
    ['shopHours[0]', { ...valid(), shopHours: [{ days: ['Mon'], fromHour: 18, toHour: 9 }] }],
    ['yardHours', { ...valid(), yardHours: undefined }],
    ['team[0].name', { ...valid(), team: [{ name: '', days: ['Mon'] }] }],
    ['team[0].days', { ...valid(), team: [{ name: 'Heine' }] }],
  ])('names "%s" as the wrong field', (field, raw) => {
    expect(() => parseOwnerSettings(raw)).toThrow(`owner-settings.json: "${field}" must be`);
  });
});
