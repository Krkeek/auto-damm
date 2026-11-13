import { TimeRange, WEEKDAYS, Weekday } from './opening-hours.model';
import { TeamMember } from './team.model';

/** The facts the owner edits on the admin page, stored in `core/content/owner-settings.json`. */
export interface OwnerSettings {
  readonly phone: { readonly display: string; readonly e164: string };
  /** WhatsApp number in E.164 format, e.g. `+49372066070`. */
  readonly whatsapp: string;
  readonly email: string;
  readonly shopHours: readonly TimeRange[];
  readonly yardHours: readonly TimeRange[];
  readonly team: readonly TeamMember[];
}

const E164 = /^\+[1-9]\d{6,14}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(field: string, expected: string): never {
  throw new Error(`owner-settings.json: "${field}" must be ${expected}.`);
}

function record(value: unknown, field: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) fail(field, 'an object');
  return value as Record<string, unknown>;
}

function text(value: unknown, field: string, pattern?: RegExp, expected = 'a non-empty text'): string {
  if (typeof value !== 'string' || value.trim() === '' || (pattern && !pattern.test(value))) fail(field, expected);
  return value;
}

function list<T>(value: unknown, field: string, item: (entry: unknown, field: string) => T): readonly T[] {
  if (!Array.isArray(value)) fail(field, 'a list');
  return (value as unknown[]).map((entry, index) => item(entry, `${field}[${index}]`));
}

function days(value: unknown, field: string): readonly Weekday[] {
  const result = list(value, field, (entry, at) => {
    if (!WEEKDAYS.some((day) => day === entry)) fail(at, `one of ${WEEKDAYS.join(', ')}`);
    return entry as Weekday;
  });
  if (result.length === 0) fail(field, 'at least one weekday');
  return result;
}

function hour(value: unknown, field: string): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 24) {
    fail(field, 'a whole hour from 0 to 24');
  }
  return value;
}

function timeRange(value: unknown, field: string): TimeRange {
  const entry = record(value, field);
  const range = {
    days: days(entry.days, `${field}.days`),
    fromHour: hour(entry.fromHour, `${field}.fromHour`),
    toHour: hour(entry.toHour, `${field}.toHour`),
  };
  if (range.fromHour >= range.toHour) fail(field, 'a time range that opens before it closes');
  return range;
}

function teamMember(value: unknown, field: string): TeamMember {
  const entry = record(value, field);
  return { name: text(entry.name, `${field}.name`), days: days(entry.days, `${field}.days`) };
}

/** Checks the settings file and returns it typed; throws an error that names the first wrong field. */
export function parseOwnerSettings(raw: unknown): OwnerSettings {
  const root = record(raw, 'settings');
  const phone = record(root.phone, 'phone');
  const international = 'an international number such as +49372066070';
  return {
    phone: {
      display: text(phone.display, 'phone.display'),
      e164: text(phone.e164, 'phone.e164', E164, international),
    },
    whatsapp: text(root.whatsapp, 'whatsapp', E164, international),
    email: text(root.email, 'email', EMAIL, 'an e-mail address'),
    shopHours: list(root.shopHours, 'shopHours', timeRange),
    yardHours: list(root.yardHours, 'yardHours', timeRange),
    team: list(root.team, 'team', teamMember),
  };
}
