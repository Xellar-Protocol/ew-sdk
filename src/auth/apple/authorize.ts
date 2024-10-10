import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWAppleAuthorize extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using an Apple account.
   * @param credential (required): Credential token (id_token) from Apple login.
   * @param expireDate (optional): The expiration date for the JWT token generated from the response.
   *
   * @example
   *
   *  const body = {
   *     credential: "eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYi...",
   *     expireDate: "2024-01-02"
   *  };
   *
   * const response = await sdk.auth.apple.authorize(body);
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/apple/authorize/ Xellar Auth Apple Docs}
   */
  async authorize(credential: string, expireDate?: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/apple', {
        credential,
        expireDate,
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
