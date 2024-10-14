import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { SendTransactionConfig, TransactionReceipt } from './types';

export class XellarEWSendTransaction extends XellarEWBase {
  /**
   * Allows you to send a custom transaction on a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `transaction` (required): The raw transaction data.
   *
   * @returns Object of transaction receipt
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
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Send_Transaction/ Xellar Wallet Send Transaction Docs}
   */
  async sendTransaction(config: SendTransactionConfig) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >('/wallet/send-transaction', {
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
