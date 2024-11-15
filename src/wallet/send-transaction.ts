import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  SendTransactionConfig,
  TransactionReceipt,
  WithTokenResponse,
} from './types';

export class XellarEWSendTransaction extends XellarEWBase {
  /**
   * Allows you to send a custom transaction on a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `transaction` (required): The raw transaction data.
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of transaction receipt. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `txReceipt`: The transaction receipt.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.sendTransaction({
   *   network: Network.ETHEREUM,
   *   transaction: {
   *     from: '0x1234567890123456789012345678901234567890',
   *     to: '0x0987654321098765432109876543210987654321',
   *     data: '0x',
   *     value: '0x0',
   *     gasPrice: '0x09184e72a000',
   *     gasLimit: '0x5208'
   *   }
   *   walletToken: "your-wallet-token",
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Send_Transaction/ Xellar Wallet Send Transaction Docs}
   */
  async sendTransaction(
    config: SendTransactionConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<TransactionReceipt>>;

  async sendTransaction(
    config: SendTransactionConfig & { refreshToken?: undefined },
  ): Promise<TransactionReceipt>;

  async sendTransaction({
    walletToken,
    refreshToken,
    ...config
  }: SendTransactionConfig): Promise<
    WithTokenResponse<TransactionReceipt> | TransactionReceipt
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >(
        '/wallet/send-transaction',
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
          txReceipt: response.data.data.txReceipt,
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
