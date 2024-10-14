import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { SendTokenConfig, TransactionReceipt } from './types';

export class XellarEWSendToken extends XellarEWBase {
  /**
   * Allows you to send token (ERC20) from a blockchain network
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
   * const receipt = await sdk.wallet.sendToken({
   *   network: Network.ETHEREUM,
   *   to: '0x1234567890123456789012345678901234567890',
   *   amount: 0.123,
   *   tokenAddress: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Send_Token/ Xellar Wallet Send Token Docs}
   */
  async sendToken(config: SendTokenConfig) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >('/wallet/send-token', {
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
