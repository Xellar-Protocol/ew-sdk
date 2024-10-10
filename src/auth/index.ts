import { XellarEWBase } from '../base';
import { Container } from '../container';
import { XellarEWAppleAuthorize } from './apple';
import { XellarEWEmailLogin, XellarEWEmailVerify } from './email';
import { XellarEWGoogleAuthorize } from './google/authorize';
import { XellarEWTelegramAuthorize } from './telegram';
import { XellarEWUsernameLogin, XellarEWUsernameRegister } from './username';
import { XellarEWWhatsAppLogin, XellarEWWhatsAppVerify } from './whatsapp';

export class XellarEWAuth extends XellarEWBase {
  protected emailLogin: XellarEWEmailLogin;

  protected emailVerify: XellarEWEmailVerify;

  protected usernameLogin: XellarEWUsernameLogin;

  protected usernameRegister: XellarEWUsernameRegister;

  protected googleAuthorize: XellarEWGoogleAuthorize;

  protected telegramAuthorize: XellarEWTelegramAuthorize;

  protected whatsappLogin: XellarEWWhatsAppLogin;

  protected whatsappVerify: XellarEWWhatsAppVerify;

  protected appleAuthorize: XellarEWAppleAuthorize;

  constructor(container: Container) {
    super(container);

    this.emailLogin = new XellarEWEmailLogin(container);
    this.emailVerify = new XellarEWEmailVerify(container);
    this.usernameLogin = new XellarEWUsernameLogin(container);
    this.usernameRegister = new XellarEWUsernameRegister(container);
    this.googleAuthorize = new XellarEWGoogleAuthorize(container);
    this.telegramAuthorize = new XellarEWTelegramAuthorize(container);
    this.whatsappLogin = new XellarEWWhatsAppLogin(container);
    this.whatsappVerify = new XellarEWWhatsAppVerify(container);
    this.appleAuthorize = new XellarEWAppleAuthorize(container);
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

  get google() {
    return {
      authorize: this.googleAuthorize.authorize.bind(this),
    };
  }

  get telegram() {
    return {
      authorize: this.telegramAuthorize.authorize.bind(this),
    };
  }

  get whatsapp() {
    return {
      login: this.whatsappLogin.login.bind(this),
      verify: this.whatsappVerify.login.bind(this),
    };
  }

  get apple() {
    return {
      authorize: this.appleAuthorize.authorize.bind(this),
    };
  }
}
