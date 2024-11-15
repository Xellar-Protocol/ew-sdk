import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { AppleAuthorizeOptions } from './types';

export class XellarEWAppleAuthorize extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using an Apple account.
   * @param credential (required): Credential token (id_token) from Apple login.
   * @param expireDate (optional): The expiration date for the JWT token generated from the response.
   * @param options (optional): Additional options for the authorization process.
   *
   * @example
   * const response = await sdk.auth.apple.authorize('credential');
   *
   * // With optional parameters
   * const response = await sdk.auth.apple.authorize('credential', '2023-12-31', { rampable: {
   *     username: 'username',
   *     fullName: 'full name',
   *     password: 'password',
   *   },
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/apple/authorize/ Xellar Auth Apple Docs}
   */
  async authorize(
    credential: string,
    expireDate?: string,
    options?: AppleAuthorizeOptions,
  ) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/apple', {
        credential,
        expireDate,
      });

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
