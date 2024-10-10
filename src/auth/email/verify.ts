import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWEmailVerify extends XellarEWBase {
  /**
   * Allows you to login to your Xellar Embedded wallet account using User’s Email, and receive an **OTP** to verify the account.
   * @param verificationToken (required): verificationToken from Login method.
   * @param otp (required): otp sent to the user's email.
   * @returns
   *
   * @example
   *
   * const requestBody = {
   *    "verificationToken": "string",
   *    "otp": "string"
   * }
   *
   * const response = await sdk.auth.email.verify(requestBody);
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/email/verify_login/ Xellar Auth Email Docs}
   */
  async verify(
    verificationToken: string,
    otp: string,
  ): Promise<AuthSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/verify-otp', {
        verificationToken,
        otp,
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
