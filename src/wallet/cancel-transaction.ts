import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { CancelTransactionConfig } from './types';

export class XellarEWCancelTransaction extends XellarEWBase {
  /**
   * Allows you to cancel transaction from a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `nonce` (required): This is a number that must be unique for each transaction, please provide the nonce of the transaction you want to cancel.
   *
   * @returns The hash of the canceled transaction.
   *
   * @example
   *
   * ```typescript
   * const hash = await sdk.wallet.cancelTransaction({
   *   network: Network.ETHEREUM,
   *   nonce: 1234567890,
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Cancel_Transaction/ Xellar Wallet Cancel Transaction Docs}
   */
  async cancelTransaction(config: CancelTransactionConfig) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<{ hash: string }>
      >('/wallet/cancel-transaction', {
        ...config,
      });

      return response.data.data.hash;
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
