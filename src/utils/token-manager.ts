/* eslint-disable no-underscore-dangle */
export class TokenManager {
  private _accessOrWalletToken: string | undefined;

  setToken(token: string) {
    this._accessOrWalletToken = token;
  }

  getToken(): string | undefined {
    return this._accessOrWalletToken;
  }
}
