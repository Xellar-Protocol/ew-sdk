import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  CheckBalanceResponse,
  GetCoinBalanceConfig,
  WithTokenResponse,
} from './types';

export class XellarEWCheckCoinBalance extends XellarEWBase {
  /**
   * Allows you to check your native balance coin from a blockchain network
   * @param {GetCoinBalanceConfig} config The configuration for checking balance coin.
   *  - `network`: The network used for transactions.
   *  - `walletToken`: The wallet token for authentication.
   *  - `refreshToken`: The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of balance, symbol, and address. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `balance`: The balance of the user's wallet.
   *  - `symbol`: The symbol of the coin.
   *  - `address`: The address of the user's wallet.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * const hash = await sdk.wallet.balanceCoin(Network.ETHEREUM);
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Check_Balance_Coin/ Xellar Wallet Check Balance Coin Docs}
   */
  async balanceCoin(
    config: GetCoinBalanceConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<CheckBalanceResponse>>;

  async balanceCoin(
    config: GetCoinBalanceConfig & { refreshToken?: undefined },
  ): Promise<CheckBalanceResponse>;

  async balanceCoin(
    config: GetCoinBalanceConfig,
  ): Promise<WithTokenResponse<CheckBalanceResponse> | CheckBalanceResponse> {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<CheckBalanceResponse>
      >(
        '/wallet/balance-coin',
        {
          network: config.network,
        },
        {
          headers: {
            Authorization: `Bearer ${config.walletToken}`,
          },
        },
      );

      if (config.refreshToken) {
        const refreshTokenResult = await this._refreshToken(
          config.refreshToken,
        );

        return {
          ...response.data.data,
          refreshToken: refreshTokenResult.refreshToken,
          walletToken: refreshTokenResult.walletToken,
        };
      }

      return response.data.data;
    } catch (error) {
      const handledError = handleError(error);
      throw new XellarError(
        handledError.message,
        handledError.code,
        handledError.details,
      );
    }
  }
}
