import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { TransactionDetailConfig, TransactionDetailResponse } from './types';

export class XellarEWTransactionDetail extends XellarEWBase {
  /**
   * Allows you to get the transaction detail
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `transactionHash` (required): The transaction hash.
   *
   * @returns Object of transaction detail
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.sendTransaction({
   *   network: Network.ETHEREUM,
   *   transactionHash: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Transaction_Detail/ Xellar Wallet Transaction Detail Docs}
   */
  async sendTransaction(config: TransactionDetailConfig) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionDetailResponse>
      >('/wallet/transaction-detail', {
        ...config,
      });

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
