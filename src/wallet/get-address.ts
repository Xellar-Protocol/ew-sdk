import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { Address } from './types';

export class XellarEWGetAddresses extends XellarEWBase {
  /**
   * Allows you to get the addresses from the wallet token
   * @param {string} walletToken The wallet token for authentication.
   *
   * @returns Array of addresses or null if the wallet token is invalid.
   *
   * @example
   *
   * ```typescript
   * const addresses = await sdk.wallet.getAddresses("your-wallet-token");
   * ```
   */
  async getAddresses(walletToken: string): Promise<Address[] | null> {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<{ address: Address[] }>
      >(
        '/wallet/address',

        {
          headers: {
            Authorization: `Bearer ${walletToken}`,
          },
        },
      );

      return response.data.data.address;
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
