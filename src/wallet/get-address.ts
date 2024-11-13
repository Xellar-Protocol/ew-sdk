import { XellarEWBase } from '../base';
import { WALLET_OR_ACCESS_TOKEN_KEY } from '../constants';
import { handleError, XellarError } from '../utils/error';
import { decodeJWT } from '../utils/jwt';
import { DecodedWalletToken } from './types';

export class XellarEWGetAddresses extends XellarEWBase {
  /**
   * Allows you to get the addresses from the wallet token
   *
   * @returns Array of addresses
   *
   * @example
   *
   * ```typescript
   * const addresses = await sdk.wallet.getAddresses();
   * ```
   *
   */
  async getAddresses() {
    try {
      const walletToken = await this.storage.getItem<string | undefined>(
        WALLET_OR_ACCESS_TOKEN_KEY,
      );

      if (!walletToken) {
        return null;
      }

      return decodeJWT<DecodedWalletToken>(walletToken).address;
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
