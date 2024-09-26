import XellarEWLogin from "./auth/email/login";
import XellarEWVerify from "./auth/email/verify";
import XellarEWBase from "./base";

export default class XellarEW extends XellarEWBase {
  private loginInstance: XellarEWLogin;
  private verifyInstance: XellarEWVerify;

  constructor(clientSecret: string, baseURL: string, version: string = "v1") {
    super(clientSecret, baseURL, version);
    this.loginInstance = new XellarEWLogin(clientSecret, baseURL, version);
    this.verifyInstance = new XellarEWVerify(clientSecret, baseURL, version);
  }

  loginWithEmail(email: string): Promise<string> {
    return this.loginInstance.loginWithEmail(email);
  }

  verifyEmail(verificationToken: string, otp: string): Promise<any> {
    return this.verifyInstance.verifyEmail(verificationToken, otp);
  }
}
