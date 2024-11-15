import { RampableAccount } from '../types/http';

export type CreateWalletOptions = {
  /** (optional)
   * The expiration date for the JWT token generated from the response.
   */
  expiredDate?: string;
  /** (optional)
   * Rampable account configuration.
   */
  rampable?: RampableAccount;
  /**
   * The access token for the request.
   */
  accessToken: string;
};

export type RecoverWalletOptions = {
  /**
   * The form data for the request.
   */
  formData: FormData;
  /**
   * The access token for the request.
   */
  accessToken: string;
};
