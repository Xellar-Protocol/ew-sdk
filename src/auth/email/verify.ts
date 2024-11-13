import { XellarEWBase } from '../../base';
import {
  RAMPABLE_ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  WALLET_OR_ACCESS_TOKEN_KEY,
} from '../../constants';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { EmailAuthOptions } from './types';

export class XellarEWEmailVerify extends XellarEWBase {
  /**
   * Allows you to verify and complete the login process for your Xellar Embedded wallet account using the OTP sent to the user's email.
   * @param verificationToken (required): The verification token received from the login method.
   * @param otp (required): The OTP sent to the user's email.
   * @param options (optional): Configuration object.
   *    - rampable (optional): Rampable account configuration.
   * @returns An AuthSuccessResponse object, potentially including a rampableAccessToken if the rampable option was provided.
   *
   * @example
   * // Basic usage
   * const response = await sdk.auth.email.verify(verificationToken, otp);
   *
   * // With rampable option
   * const response = await sdk.auth.email.verify(verificationToken, otp, {
   *   rampable: {
   *     username: 'username',
   *     fullName: 'full name',
   *     password: 'password',
   *   },
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/email/verify_login/ Xellar Auth Email Docs}
   */
  async verify(
    verificationToken: string,
    otp: string,
    options?: EmailAuthOptions,
  ): Promise<AuthSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/verify-otp', {
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
