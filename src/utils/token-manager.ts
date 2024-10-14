/* eslint-disable no-underscore-dangle */
export class TokenManager {
  private _walletToken: string | undefined;

  private _refreshToken: string | undefined;

  private _isWalletTokenUsed: boolean = false;

  setWalletToken(token: string) {
    this._walletToken = token;
    this._isWalletTokenUsed = false;
  }

  getWalletToken(): string | undefined {
    if (this._isWalletTokenUsed) {
      return undefined;
    }
    this._isWalletTokenUsed = true;
    return this._walletToken;
  }

  setRefreshToken(token: string) {
    this._refreshToken = token;
  }

  getRefreshToken(): string | undefined {
    return this._refreshToken;
  }

  isWalletTokenUsed(): boolean {
    return this._isWalletTokenUsed;
  }
}
