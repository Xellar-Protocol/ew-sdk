import { handleError, XellarError } from '../utils/error';
import { decodeJWT } from '../utils/jwt';
import { Address, DecodedWalletToken } from './types';

export class XellarEWGetAddresses {
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
  static async getAddresses(walletToken: string): Promise<Address[] | null> {
    try {
      return decodeJWT<DecodedWalletToken>(walletToken)?.address || null;
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
