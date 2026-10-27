import { OpeningSchedule } from './opening-hours.model';

export type CertificateId = 'demontage' | 'arge';

export interface Certificate {
  readonly id: CertificateId;
  readonly image: string;
}

export interface Supplier {
  readonly name: string;
  readonly logo: string;
}

/** Language-independent facts about the business. */
export interface BusinessProfile {
  readonly tradeName: string;
  readonly groupName: string;
  readonly owner: string;
  readonly street: string;
  readonly postalCode: string;
  readonly city: string;
  /** Query string used for map links. */
  readonly mapsQuery: string;
  readonly phone: { readonly display: string; readonly e164: string };
  readonly email: string;
  readonly registerNumber: string;
  readonly registerCourt: string;
  readonly vatId: string;
  readonly odrUrl: string;
  readonly schedules: {
    readonly shop: OpeningSchedule;
    readonly yard: OpeningSchedule;
  };
  readonly certificates: readonly Certificate[];
  readonly suppliers: readonly Supplier[];
}
