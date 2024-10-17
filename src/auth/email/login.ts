import { XellarEWBase } from '../../base';
import { BaseHttpResponse, EmailLoginResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWEmailLogin extends XellarEWBase {
  /**
   * Allows you to initiate the login process for your Xellar Embedded wallet account using the User's Email. An OTP will be sent to the provided email for verification.
   * @param email (required): User's email address.
   * @returns A verification token.
   *
   * @example
   * // Basic usage
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
