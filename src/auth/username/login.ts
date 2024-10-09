import { XellarEWBase } from '../../base';
import { AuthSuccessResponse, BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWUsernameLogin extends XellarEWBase {
  /**
   *
   * @param username
   * @param password
   * @returns
   */
  async login(username: string, password: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<AuthSuccessResponse>
      >('/auth/login', {
        username,
        password,
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
