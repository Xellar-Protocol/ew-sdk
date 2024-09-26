import XellarEWBase from "../../base";

export default class XellarEWLogin extends XellarEWBase {
  async loginWithEmail(email: string): Promise<string> {
    try {
      const response = await this.axiosInstance.post("/auth/login-otp", {
        email,
      });
      return response.data.data.verificationToken;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
}
