import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import { EstimateResponse, EstimateSendERC721Options } from '../../interfaces';

export class XellarAAEstimateSendERC721 extends XellarEWBase {
  /**
   * Estimate the cost of sending ERC721 tokens
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to estimate cost for.
   *  - `tokenAddress` (required): The address of the ERC721 token contract.
   *  - `to` (required): The recipient address.
   *  - `tokenId` (required): The ID of the token to send.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.estimate.sendERC721({
   *   accountId: "67959f7927373a6808679de2",
   *   tokenAddress: "0x...",
   *   to: "0x...",
   *   tokenId: "4"
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/estimate/transfer_erc721/ Xellar Account Abstraction Estimate Send ERC721 Docs}
   */
  async estimateSendERC721(options: EstimateSendERC721Options) {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<EstimateResponse>
      >('/userOp/sendERC721/estimate', {
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
