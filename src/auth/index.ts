import { XellarEWBase } from '../base';
import { Config } from '../types/config';
import { XellarEWEmailLogin, XellarEWEmailVerify } from './email';
import { XellarEWUsernameLogin, XellarEWUsernameRegister } from './username';

export class XellarEWAuth extends XellarEWBase {
  protected emailLogin: XellarEWEmailLogin;

  protected emailVerify: XellarEWEmailVerify;

  protected usernameLogin: XellarEWUsernameLogin;

  protected usernameRegister: XellarEWUsernameRegister;

  constructor(config: Config) {
    super(config);

    this.emailLogin = new XellarEWEmailLogin(config);
    this.emailVerify = new XellarEWEmailVerify(config);

    this.usernameLogin = new XellarEWUsernameLogin(config);
    this.usernameRegister = new XellarEWUsernameRegister(config);
  }

  get email() {
    return {
      login: this.emailLogin.login.bind(this),
      verify: this.emailVerify.verify.bind(this),
    };
  }

  get username() {
    return {
      login: this.usernameLogin.login.bind(this),
      register: this.usernameRegister.register.bind(this),
    };
  }
}
