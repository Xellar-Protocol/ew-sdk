import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import { CreateUserOpResponse } from '../../interfaces';

export class XellarAACreateActivate extends XellarEWBase {
  /**
   * Create a user operation for activating an account
   * @param accountId The ID of the account to activate
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.create.activate("67b1f9310521667c3e94d625");
   * // Returns:
   * // {
   * //   userOpId: "...",
   * //   hash: "0x...",
   * //   validUntil: 1234567890
   * // }
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/hash/activate/ Xellar Account Abstraction Create Activate Docs}
   */
  async activate(accountId: string): Promise<CreateUserOpResponse> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<CreateUserOpResponse>
      >('/userOp/deploy/hash', {
        accountId,
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
