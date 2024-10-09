import { XellarEWBase } from '../../base';
import { BaseHttpResponse, UsernameRegisterResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWUsernameRegister extends XellarEWBase {
  /**
   *
   * @param username
   * @param password
   * @returns accessToken
   */
  async register(username: string, password: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<UsernameRegisterResponse>
      >('/auth/register', {
        username,
        password,
      });

      return response.data.data.accessToken;
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
