import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { CancelTransactionConfig, WithTokenResponse } from './types';

export class XellarEWCancelTransaction extends XellarEWBase {
  /**
   * Allows you to cancel transaction from a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `nonce` (required): This is a number that must be unique for each transaction, please provide the nonce of the transaction you want to cancel.
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns An object containing the hash of the canceled transaction. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `hash`: The hash of the canceled transaction.
   *  - `refreshToken`: The new refresh token.
   *  - `walletToken`: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * const hash = await sdk.wallet.cancelTransaction({
   *   network: Network.ETHEREUM,
   *   nonce: 1234567890,
   *   walletToken: "your-wallet-token",
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Cancel_Transaction/ Xellar Wallet Cancel Transaction Docs}
   */
  async cancelTransaction(
    config: CancelTransactionConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<{ hash: string }>>;

  async cancelTransaction(
    config: CancelTransactionConfig & { refreshToken?: undefined },
  ): Promise<{ hash: string }>;

  async cancelTransaction({
    walletToken,
    refreshToken,
    ...config
  }: CancelTransactionConfig): Promise<
    WithTokenResponse<{ hash: string }> | { hash: string }
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<{ hash: string }>
      >(
        '/wallet/cancel-transaction',
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
          hash: response.data.data.hash,
          refreshToken: refreshTokenResult.refreshToken,
          walletToken: refreshTokenResult.walletToken,
        };
      }

      return {
        hash: response.data.data.hash,
      };
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
