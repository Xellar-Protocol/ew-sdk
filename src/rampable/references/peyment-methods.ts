import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { RampablePaymentMethod } from './types';

export class XellarEWRampablePaymentMethod extends XellarEWBase {
  /**
   *
   * Allows you to retrieve a list of payment methods supported for onramp transaction by the API.
   *
   * @example
   * ```typescript
   * const paymentMethods = await xellar.rampableReference.listPaymentMethods();
   * ```
   *
   * @see {@link https://docs.rampable.co/references#list-all-payment-methods Rampable Payment Method API}
   */
  async listPaymentMethods() {
    try {
      const response = await this.rampableAxiosInstance.get<
        BaseHttpResponse<RampablePaymentMethod[]>
      >('/reference/payment-methods');

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
