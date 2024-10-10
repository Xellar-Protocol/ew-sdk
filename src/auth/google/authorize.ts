import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWUGoogleAuthorize extends XellarEWBase {
  /**
   *
   * @param credentials
   * @param expiredDate
   * @returns
   */
  async authorize(credentials: string, expiredDate?: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/google', {
        credentials,
        ...(expiredDate ? { expiredDate } : {}),
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
