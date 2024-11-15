import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  BalanceTokenBatchConfig,
  BalanceTokenConfig,
  CheckBalanceBatchResponse,
  CheckBalanceResponse,
  WithTokenResponse,
} from './types';

export class XellarEWCheckTokenBalance extends XellarEWBase {
  /**
   * Allows you to check your token balance from a blockchain network
   * @param {BalanceTokenConfig} config
   *
   *  - `network` (required): The network used for transactions.
   *  - `tokenAddress` (required): The address of the token.
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of balance, symbol, and address. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `balance`: The balance of the token.
   *  - `symbol`: The symbol of the token.
   *  - `address`: The address of the token.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * const balance = await sdk.wallet.balanceToken({
   *  network: Network.ETHEREUM,
   *  tokenAddress: '0x1234567890123456789012345678901234567890',
   *  walletToken: 'your-wallet-token',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Check_Balance_Token/ Xellar Wallet Check Balance Token Docs}
   */
  async balanceToken(
    config: BalanceTokenConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<CheckBalanceResponse>>;

  async balanceToken(
    config: BalanceTokenConfig & { refreshToken?: undefined },
  ): Promise<CheckBalanceResponse>;

  async balanceToken({
    walletToken,
    refreshToken,
    network,
    tokenAddress,
  }: BalanceTokenConfig): Promise<
    WithTokenResponse<CheckBalanceResponse> | CheckBalanceResponse
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<CheckBalanceResponse>
      >(
        '/wallet/balance-token',
        {
          network,
          tokenAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${walletToken}`,
          },
        },
      );

      if (refreshToken) {
        const refreshTokenResult = await this._refreshToken(refreshToken);

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

  /**
   * Allows you to check your token balance from a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `tokenAddresses` (required): The addresses of the token.
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Array of balance, symbol, and address
   *  - `address`: The address of the token.
   *  - `tokens`: Array of balance, symbol, and decimals of the token.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * const response = await sdk.wallet.balanceTokenBatch({
   *  network: Network.ETHEREUM,
   *  tokenAddresses: ['0x1234567890123456789012345678901234567890', '0x1234567890123456789012345678901234567890'],
   *  walletToken: 'your-wallet-token',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Check_Batch_Balance_Token/ Xellar Wallet Check Balance Token Batch Docs}
   */
  async balanceTokenBatch({
    network,
    tokenAddresses,
    walletToken,
    refreshToken,
  }: BalanceTokenBatchConfig): Promise<
    CheckBalanceBatchResponse | WithTokenResponse<CheckBalanceBatchResponse>
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<CheckBalanceBatchResponse>
      >(
        '/wallet/batch-balance-token',
        {
          network,
          tokenAddresses,
        },
        {
          headers: {
            Authorization: `Bearer ${walletToken}`,
          },
        },
      );

      if (refreshToken) {
        const refreshTokenResult = await this._refreshToken(refreshToken);

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
