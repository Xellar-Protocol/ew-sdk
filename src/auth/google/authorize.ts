import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { GoogleAuthorizeOptions } from './type';

export class XellarEWGoogleAuthorize extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using google account.
   * @param credentials (required): Credential token from google login.
   * @param expiredDate (optional): The expiration date for the JWT token generated from the response
   * @param options (optional): Google authorize options.
   *    - rampable (optional): Rampable account configuration.
   *
   * @example
   * const response = await sdk.auth.google.authorize(credentials, expiredDate);
   *
   * // With rampable
   * const response = await sdk.auth.google.authorize({
   *   credentials,
   *   expiredDate,
   *   rampable: {
   *     username: 'username',
   *     fullName: 'full name',
   *     password: 'password',
   *   },
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/google/authorize/ Xellar Auth Google Docs}
   */
  async authorize(
    credential: string,
    expiredDate?: string,
    options?: GoogleAuthorizeOptions,
  ) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/google', {
        credential,
        ...(expiredDate ? { expiredDate } : {}),
      });

      if (
        !response.data?.data?.rampableAccessToken &&
        options?.rampable &&
        !!response.data.data.isWalletCreated
      ) {
        const rampableAccessToken = await this.createRampableAccount(
          options.rampable,
          response.data.data.walletToken,
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
