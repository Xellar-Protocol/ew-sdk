import { isAxiosError } from 'axios';

import { XellarEWBase } from '../../base';

export class XellarEWEmailLogin extends XellarEWBase {
  /**
   * Authenticate user with email
   *
   * User need to verify email by otp with `verifyEmail` method
   *
   * @param email
   * @returns
   */
  async loginWithEmail(email: string): Promise<string> {
    try {
      const response = await this.axiosInstance.post('/auth/login-otp', {
        email,
      });
      return response.data.data.verificationToken;
    } catch (error) {
      // TODO: Implement in utility
      if (isAxiosError(error)) {
        throw new Error(`Login failed: ${error.response?.data}`);
      }
      throw new Error(`Login failed: ${error}`);
    }
  }
}
