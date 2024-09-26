import XellarEWBase from "../../base";

export default class XellarEWVerify extends XellarEWBase {
  async verifyEmail(verificationToken: string, otp: string): Promise<any> {
    try {
      const response = await this.axiosInstance.post("/auth/verify-otp", {
        verificationToken,
        otp,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Email verification failed: ${error.message}`);
    }
  }
}
