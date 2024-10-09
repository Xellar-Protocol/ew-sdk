import { isAxiosError } from 'axios';

import { XellarEWBase } from '../../base';

export class XellarEWEmailVerify extends XellarEWBase {
  /**
   * Verify email by given verification token and otp
   * @param verificationToken
   * @param otp
   * @returns
   */
  async verifyEmail(verificationToken: string, otp: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/auth/verify-otp', {
        verificationToken,
        otp,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(`Email Verification failed: ${error.response?.data}`);
      }
      throw new Error(`Email Verification failed: ${error}`);
    }
  }
}
