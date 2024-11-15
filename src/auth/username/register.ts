import { XellarEWBase } from '../../base';
import { BaseHttpResponse, UsernameRegisterResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { UsernameAuthOptions } from './type';

export class XellarEWUsernameRegister extends XellarEWBase {
  /**
   * Allows you to register a new account in your Xellar Embedded wallet using the User’s username and password.
   * @param username (required): User’s chosen username.
   * @param password (required): User’s password.
   * @param config (optional): Configuration object.
   *    - rampable (optional): Rampable account configuration.
   *
   * @example
   * const response = await sdk.auth.username.register(username, password);
   *
   * // With rampable
   * const response = await sdk.auth.username.register(username, password, {
   *   rampable: {
   *     username: 'username',
   *     fullName: 'full name',
   *     password: 'password',
   *   },
   * });
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/username/register/ Xellar Auth Username Docs}
   */
  async register(
    username: string,
    password: string,
    options?: UsernameAuthOptions,
  ) {
    try {
      let rampableAccessToken: string | undefined;

      if (options?.rampable) {
        rampableAccessToken = await this.createRampableAccount(
          options.rampable,
        );
      }

      const response = await this.axiosInstance.post<
        BaseHttpResponse<UsernameRegisterResponse>
      >('/auth/register', {
        username,
        password,
      });

      if (rampableAccessToken) {
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
