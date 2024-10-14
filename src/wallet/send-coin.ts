import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { SendCoinConfig, TransactionReceipt } from './types';

export class XellarEWSendCoin extends XellarEWBase {
  /**
   * Allows you to send coin (native currency) from a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `to` (required): The address of the recipient.
   *  - `amount` (required): The amount of the transaction.
   *
   * @returns Object of transaction receipt
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.sendCoin({
   *   network: Network.ETHEREUM,
   *   to: '0x1234567890123456789012345678901234567890',
   *   amount: 0.123,
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Send_Coin/ Xellar Wallet Send Coin Docs}
   */
  async sendCoin(config: SendCoinConfig) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >('/wallet/send-coin', {
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
