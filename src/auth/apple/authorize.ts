import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { TokenManager } from '../../utils/token-manager';

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

      const token = response.data.data.isWalletCreated
        ? response.data.data.walletToken
        : response.data.data.accessToken;

      const { refreshToken } = response.data.data;
      const tokenManager = this.container.resolve<TokenManager>('TokenManager');

      tokenManager.setWalletToken(token);
      tokenManager.setRefreshToken(refreshToken);

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
