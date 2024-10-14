import { XellarEWBase } from '../base';
import { Network } from '../types/chain';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { CheckBalanceBatchResponse, CheckBalanceResponse } from './types';

export class XellarEWCheckTokenBalance extends XellarEWBase {
  /**
   * Allows you to check your token balance from a blockchain network
   * @param {string} tokenAddress The address of the token.
   * @param {Network} network The network used for transactions.
   *
   * @returns Object of balance, symbol, and address
   *
   * @example
   *
   * ```typescript
   * const hash = await sdk.wallet.balanceToken('0x1234567890123456789012345678901234567890', Network.ETHEREUM);
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Check_Balance_Token/ Xellar Wallet Check Balance Token Docs}
   */
  async balanceToken(tokenAddress: string, network: Network) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<CheckBalanceResponse>
      >('/wallet/balance-token', {
        network,
        tokenAddress,
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

  /**
   * Allows you to check your token balance from a blockchain network
   * @param {string[]} tokenAddresses The addresses of the token.
   * @param {Network} network The network used for transactions.
   *
   * @returns Array of balance, symbol, and address
   *
   * @example
   *
   * ```typescript
   * const hash = await sdk.wallet.balanceTokenBatch(['0x1234567890123456789012345678901234567890', '0x1234567890123456789012345678901234567890'], Network.ETHEREUM);
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Check_Batch_Balance_Token/ Xellar Wallet Check Balance Token Batch Docs}
   */
  async balanceTokenBatch(tokenAddresses: string[], network: Network) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<CheckBalanceBatchResponse>
      >('/wallet/batch-balance-token', {
        network,
        tokenAddresses,
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
