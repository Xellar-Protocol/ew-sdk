import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWEmailVerify extends XellarEWBase {
  /**
   * Verify email by given verification token and otp
   * @param verificationToken
   * @param otp
   * @description
   * If
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
