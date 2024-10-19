import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { ListCryptosParams, RampableCrypto } from './types';

export class XellarEWRampableCrypto extends XellarEWBase {
  /**
   *
   * Allows you to retrieve a list of all countries supported by the API.
   *
   * @example
   * ```typescript
   * const cryptos = await xellar.rampableReference.listCryptos({
   *   blockchainType: 'EVM',
   * });
   * ```
   *
   * @see {@link https://docs.rampable.co/references#list-all-crypto Rampable Crypto API}
   */
  async listCryptos(params?: ListCryptosParams) {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<RampableCrypto[]>
      >('/reference/cryptos', {
        params,
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
