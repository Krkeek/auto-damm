import { BusinessProfile } from '@core/models/business-profile.model';

/** Port: where the business facts (address, hours, suppliers, ...) come from. */
export abstract class BusinessRepository {
  abstract getProfile(): BusinessProfile;
}
