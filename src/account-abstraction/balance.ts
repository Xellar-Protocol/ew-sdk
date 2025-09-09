import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  BalanceDTO,
  BalanceResponse,
  TokenBalanceDTO,
  TokenBatchBalanceDTO,
} from './interfaces';

export class XellarAABalance extends XellarEWBase {
  /**
   * Get the native coin balance for an account
   * @param accountId The ID of the account to check balance for
   *
   * @example
   * ```typescript
   * const result = await sdk.accountAbstraction.balance.getNativeBalance("68027beb6a1ae347d38563d7");
   * // Returns:
   * // {
   * //   balance: "0",
   * //   formattedBalance: "0"
   * // }
   * ```
   */
  async getNativeBalance(
    accountId: string,
    config?: AxiosRequestConfig,
  ): Promise<BalanceDTO> {
    try {
      const response = await this.aaInstance.post<BaseHttpResponse<BalanceDTO>>(
        '/smart-account/balance/native',
        {
          accountId,
        },
        config,
      );
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
   * Get the balance for a specific token
   * @param accountId The ID of the account to check balance for
   * @param tokenAddress The token contract address
   *
   * @example
   * ```typescript
   * const result = await sdk.accountAbstraction.balance.getTokenBalance(
   *   "68027beb6a1ae347d38563d7",
   *   "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
   * );
   * // Returns:
   * // {
   * //   balance: "100000",
   * //   symbol: "USDT",
   * //   decimals: 6,
   * //   formattedBalance: "0.1"
   * // }
   * ```
   */
  async getTokenBalance(
    accountId: string,
    tokenAddress: string,
  ): Promise<TokenBalanceDTO> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<TokenBalanceDTO>
      >('/smart-account/balance/token', { accountId, tokenAddress });
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
   * Get balances for multiple tokens in a single request
   * @param accountId The ID of the account to check balances for
   * @param tokenAddresses Array of token contract addresses
   *
   * @example
   * ```typescript
   * const result = await sdk.accountAbstraction.balance.getBatchTokenBalances(
   *   "68027beb6a1ae347d38563d7",
   *   ["0xc2132d05d31c914a87c6611c10748aeb04b58e8f"]
   * );
   * // Returns:
   * // {
   * //   accountId: "68027beb6a1ae347d38563d7",
   * //   tokens: [{
   * //     balance: "100000",
   * //     symbol: "USDT",
   * //     decimals: 6,
   * //     formattedBalance: "0.1"
   * //   }]
   * // }
   * ```
   */
  async getBatchTokenBalances(
    accountId: string,
    tokenAddresses: string[],
  ): Promise<TokenBatchBalanceDTO> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<TokenBatchBalanceDTO>
      >('/smart-account/balance/token/batch', { accountId, tokenAddresses });
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
