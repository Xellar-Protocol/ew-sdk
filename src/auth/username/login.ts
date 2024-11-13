import { XellarEWBase } from '../../base';
import {
  RAMPABLE_ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  WALLET_OR_ACCESS_TOKEN_KEY,
} from '../../constants';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { UsernameAuthOptions } from './type';

export class XellarEWUsernameLogin extends XellarEWBase {
  /**
   * Allows you to log in to your Xellar Embedded wallet account using the User’s username and password.
   * @param username (required): User’s chosen username.
   * @param password (required): User’s password.
   * @param options (optional): Options for the login request.
   *  - rampable (optional): Rampable account configuration.
   *
   * @example
   * const response = await sdk.auth.username.login(username, password);
   *
   * // With rampable
   * const response = await sdk.auth.username.login(username, password, {
   *   rampable: {
   *     username: 'username',
   *     fullName: 'full name',
   *     password: 'password',
   *   },
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/username/login/ Xellar Auth Username Docs}
   */
  async login(
    username: string,
    password: string,
    options?: UsernameAuthOptions,
  ) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/login', {
        username,
        password,
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
