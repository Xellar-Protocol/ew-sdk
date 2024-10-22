/* eslint-disable no-underscore-dangle */
export class TokenManager {
  private _walletOrAccessToken: string | undefined;

  private _refreshToken: string | undefined;

  private _rampableAccessToken: string | undefined;

  private _rampableClientSecret: string | undefined;

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

  setRampableAccessToken(token: string | undefined) {
    this._rampableAccessToken = token;
  }

  getRampableAccessToken(): string | undefined {
    return this._rampableAccessToken;
  }

  setRampableClientSecret(secret: string | undefined) {
    this._rampableClientSecret = secret;
  }

  getRampableClientSecret(): string | undefined {
    return this._rampableClientSecret;
  }
}
