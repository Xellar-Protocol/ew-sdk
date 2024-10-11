import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { TokenManager } from '../../utils/token-manager';

export class XellarEWWhatsAppVerify extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using User’s whatsapp number.
   * @param verificationToken (required): verificationToken from Login.
   * @param otp (required): otp sent to the user's whatsapp account.
   *
   * @example
   * const response = await sdk.auth.whatsapp.verify(verificationToken, otp);
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/whatsapp/verify_otp/ Xellar Auth WhatsApp Verify Docs}
   */
  async login(verificationToken: string, otp: string) {
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
