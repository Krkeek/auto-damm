import { BusinessProfile } from '../models/business-profile';

/** Port: where the business facts (address, hours, suppliers, ...) come from. */
export abstract class BusinessRepository {
  abstract getProfile(): BusinessProfile;
}
