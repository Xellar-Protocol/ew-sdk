import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  TransactionDetailConfig,
  TransactionDetailResponse,
  WithTokenResponse,
} from './types';

export class XellarEWTransactionDetail extends XellarEWBase {
  /**
   * Allows you to get the transaction detail
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `transactionHash` (required): The transaction hash.
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of transaction detail. If you provide `refreshToken`, the SDK will return the new `refreshToken` and `walletToken`.
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.transactionDetail({
   *   network: Network.ETHEREUM,
   *   transactionHash: '0x1234567890123456789012345678901234567890',
   *   walletToken: 'your-wallet-token',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Transaction_Detail/ Xellar Wallet Transaction Detail Docs}
   */
  async transactionDetail(
    config: TransactionDetailConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<TransactionDetailResponse>>;

  async transactionDetail(
    config: TransactionDetailConfig & { refreshToken?: undefined },
  ): Promise<TransactionDetailResponse>;

  async transactionDetail({
    walletToken,
    refreshToken,
    ...config
  }: TransactionDetailConfig): Promise<
    WithTokenResponse<TransactionDetailResponse> | TransactionDetailResponse
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionDetailResponse>
      >(
        '/wallet/transaction-detail',
        {
          ...config,
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
