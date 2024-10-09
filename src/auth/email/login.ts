import { XellarEWBase } from '../../base';
import { BaseHttpResponse, EmailLoginResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWEmailLogin extends XellarEWBase {
  /**
   * Authenticate user with email
   *
   * User need to verify email by otp with `verifyEmail` method
   *
   * @param email
   * @returns
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
