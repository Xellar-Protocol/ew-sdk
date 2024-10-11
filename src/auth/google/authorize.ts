import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { TokenManager } from '../../utils/token-manager';

export class XellarEWGoogleAuthorize extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using google account.
   * @param credentials (required): Credential token from google login.
   * @param expiredDate (optional): The expiration date for the JWT token generated from the response
   *
   * @example
   * const response = await sdk.auth.google.authorize(credentials, expiredDate);
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/google/authorize/ Xellar Auth Google Docs}
   */
  async authorize(credentials: string, expiredDate?: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/google', {
        credentials,
        ...(expiredDate ? { expiredDate } : {}),
      });

      const token = response.data.data.isWalletCreated
        ? response.data.data.walletToken
        : response.data.data.accessToken;

      this.container.resolve<TokenManager>('TokenManager').setToken(token);

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
