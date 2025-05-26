import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { AASubmitUserOpOptions, AASubmitUserOpResponse } from '../interfaces';

export class XellarAASubmit extends XellarEWBase {
  /**
   * Submit a user operation for execution on the blockchain
   * @param options Configuration object.
   *
   *  - `signature` (required): The cryptographic signature by the owner of the account.
   *  - `userOpId` (required): The unique identifier of the user operation.
   *  - `hash` (required): The hash of the user operation.
   *  - `isSponsored` (optional): A boolean indicating whether the operation is sponsored by organization. Defaults to false.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.submitUserOp({
   *   signature: "0x...",
   *   userOpId: "67b1fc9a442f26832dadd881",
   *   hash: "0x...",
   *   isSponsored: true
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/submit/ Xellar Account Abstraction Submit User Operation Docs}
   */
  async submitUserOp(options: AASubmitUserOpOptions) {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<AASubmitUserOpResponse>
      >('/userOp/submit', {
        signature: options.signature,
        userOpId: options.userOpId,
        hash: options.hash,
        isSponsored: options.isSponsored ?? false,
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
