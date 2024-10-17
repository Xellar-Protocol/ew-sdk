/* eslint-disable no-underscore-dangle */
export class TokenManager {
  private _walletOrAccessToken: string | undefined;

  private _refreshToken: string | undefined;

  private _rampableAccessToken: string | undefined;

  setWalletToken(token: string) {
    this._walletOrAccessToken = token;
  }

  getWalletToken(): string | undefined {
    return this._walletOrAccessToken;
  }

  setRefreshToken(token: string) {
    this._refreshToken = token;
  }

  getRefreshToken(): string | undefined {
    return this._refreshToken;
  }

  setRampableAccessToken(token: string) {
    this._rampableAccessToken = token;
  }

  getRampableAccessToken(): string | undefined {
    return this._rampableAccessToken;
  }
}
