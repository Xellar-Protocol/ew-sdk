import { XellarEWBase } from '../../base';
import { BaseHttpResponse, EmailLoginResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWEmailLogin extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using User’s Email, and receive an **OTP** to verify the account.
   * @param email (required): User’s chosen email.
   * @returns
   *
   * @example
   * const response = await sdk.auth.email.login(email);
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/email/login/ Xellar Auth Email Docs}
   */
  async login(email: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<EmailLoginResponse>
      >('/auth/login-otp', {
        email,
      });
      return response.data.data.verificationToken;
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
