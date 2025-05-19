import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import {
  CreateUserOpResponse,
  EstimateSendERC721Options,
} from '../../interfaces';

export class XellarAACreateSendERC721 extends XellarEWBase {
  /**
   * Create a user operation for sending ERC721 tokens
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to send from.
   *  - `tokenAddress` (required): The address of the ERC721 token contract.
   *  - `to` (required): The recipient address.
   *  - `tokenId` (required): The ID of the token to send.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.aa.create.sendERC721({
   *   accountId: "67959f7927373a6808679de2",
   *   tokenAddress: "0x...",
   *   to: "0x...",
   *   tokenId: "4"
   * });
   * // Returns:
   * // {
   * //   userOpId: "...",
   * //   hash: "0x...",
   * //   validUntil: 1234567890
   * // }
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/hash/transfer_erc721/ Xellar Account Abstraction Create Send ERC721 Docs}
   */
  async sendERC721(
    options: EstimateSendERC721Options,
  ): Promise<CreateUserOpResponse> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<CreateUserOpResponse>
      >('/userOp/sendERC721/hash', {
        accountId: options.accountId,
        tokenAddress: options.tokenAddress,
        to: options.to,
        tokenId: options.tokenId,
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
