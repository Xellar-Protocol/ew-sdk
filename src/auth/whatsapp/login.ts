import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WhatsAppLoginResponse } from './types';

export class XellarEWWhatsAppLogin extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using User’s whatsapp number.
   * @param phoneNumber (required): User’s chosen phone number for their whatsapp number.
   * @returns `WhatsAppLoginResponse`: An object containing the `verifyToken` and `isWalletCreated` indicating whether the user has created a wallet or not.
   *
   * @example
   * const response = await sdk.auth.whatsapp.login(phoneNumber);
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/whatsapp/login/ Xellar Auth WhatsApp Docs}
   */
  async login(phoneNumber: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<WhatsAppLoginResponse>
      >('/auth/login-whatsapp', {
        phoneNumber,
      });
      return response.data.data;
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }
}
