import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWUsernameLogin extends XellarEWBase {
  /**
   * Allows you to log in to your Xellar Embedded wallet account using the User’s username and password.
   * @param username (required): User’s chosen username.
   * @param password (required): User’s password.
   *
   * @example
   * const response = await sdk.auth.username.login(username, password);
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/username/login/ Xellar Auth Username Docs}
   */
  async login(username: string, password: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/login', {
        username,
        password,
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
