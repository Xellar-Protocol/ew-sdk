import { XellarEWEmailLogin, XellarEWEmailVerify } from './auth/email';
import { XellarEWBase } from './base';

// eslint-disable-next-line no-restricted-exports
export default class XellarEW extends XellarEWBase {
  private loginInstance: XellarEWEmailLogin;

  private verifyInstance: XellarEWEmailVerify;

  constructor(clientSecret: string, baseURL: string, version: string = 'v2') {
    super(clientSecret, baseURL, version);
    this.loginInstance = new XellarEWEmailLogin(clientSecret, baseURL, version);
    this.verifyInstance = new XellarEWEmailVerify(
      clientSecret,
      baseURL,
      version,
    );
  }

  loginWithEmail(email: string): Promise<string> {
    return this.loginInstance.loginWithEmail(email);
  }

  verifyEmail(verificationToken: string, otp: string): Promise<any> {
    return this.verifyInstance.verifyEmail(verificationToken, otp);
  }
}
