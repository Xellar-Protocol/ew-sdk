import { XellarEWBase } from '../base';
import { Network } from '../types/chain';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { CheckBalanceResponse } from './types';

export class XellarEWCheckCoinBalance extends XellarEWBase {
  /**
   * Allows you to check your native balance coin from a blockchain network
   * @param {Network} network The network used for transactions.
   *
   * @returns Object of balance, symbol, and address
   *
   * @example
   *
   * ```typescript
   * const hash = await sdk.wallet.balanceCoin(Network.ETHEREUM);
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Check_Balance_Coin/ Xellar Wallet Check Balance Coin Docs}
   */
  async balanceCoin(network: Network) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<CheckBalanceResponse>
      >('/wallet/balance-coin', {
        network,
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
