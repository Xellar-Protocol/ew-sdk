import { XellarEWBase } from '../../base';
import type {
  BaseHttpResponse,
  CustodyRegisterResponse,
} from '../../types/http';
import { handleError, XellarError } from '../../utils/error';

export class XellarEWCustodyRegister extends XellarEWBase {
  /**
   * Allows you to register a new account in your Xellar Embedded wallet using the User's subId.
   * @param subId (required): User's unique identifier.
   *
   * @example
   * const response = await sdk.auth.custody.register(subId);
   *
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/setup_authentication/custody/register/ Xellar Auth Custody Docs}
   */
  async register(subId: string) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<CustodyRegisterResponse>
      >('/auth/register-custody', {
        subId,
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
