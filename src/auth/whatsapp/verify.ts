import { XellarEWBase } from '../../base';
import {
  RAMPABLE_ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  WALLET_OR_ACCESS_TOKEN_KEY,
} from '../../constants';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { WhatsAppAuthOptions } from './types';

export class XellarEWWhatsAppVerify extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using User’s whatsapp number.
   * @param verificationToken (required): verificationToken from Login.
   * @param otp (required): otp sent to the user's whatsapp account.
   * @param options (optional): WhatsApp auth options.
   *    - rampable (optional): Rampable account configuration.
   *
   * @example
   * // Basic usage
   * const response = await sdk.auth.whatsapp.verify(verificationToken, otp);
   *
   * // With rampable option
   * const response = await sdk.auth.whatsapp.verify(verificationToken, otp, {
   *   rampable: {
   *     username: 'username',
   *     fullName: 'full name',
   *     password: 'password',
   *   },
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/whatsapp/verify_otp/ Xellar Auth WhatsApp Verify Docs}
   */
  async login(
    verificationToken: string,
    otp: string,
    options?: WhatsAppAuthOptions,
  ) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/verify-whatsapp', {
        verificationToken,
        otp,
      });

      const token = response.data.data.isWalletCreated
        ? response.data.data.walletToken
        : response.data.data.accessToken;

      const { refreshToken } = response.data.data;

      await this.storage.setItem(WALLET_OR_ACCESS_TOKEN_KEY, token);
      await this.storage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      if (response.data?.data?.rampableAccessToken) {
        await this.storage.setItem(
          RAMPABLE_ACCESS_TOKEN_KEY,
          response.data.data.rampableAccessToken,
        );
      }

      if (!response.data?.data?.rampableAccessToken && options?.rampable) {
        const rampableAccessToken = await this.createRampableAccount(
          options.rampable,
        );

        return {
          ...response.data.data,
          rampableAccessToken,
        };
      }

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
