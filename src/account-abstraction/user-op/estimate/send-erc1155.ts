import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../../../base';
import { BaseHttpResponse } from '../../../types/http';
import { handleError, XellarError } from '../../../utils/error';
import { EstimateResponse, EstimateSendERC1155Options } from '../../interfaces';

export class XellarAAEstimateSendERC1155 extends XellarEWBase {
  /**
   * Estimate the cost of sending ERC1155 tokens
   * @param options Configuration object.
   *
   *  - `accountId` (required): The ID of the account to estimate cost for.
   *  - `tokenAddress` (required): The address of the ERC1155 token contract.
   *  - `to` (required): The recipient address.
   *  - `tokenId` (required): The ID of the token to send.
   *  - `amount` (required): The amount of tokens to send.
   *  - `data` (optional): Additional data to include in the transaction.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.estimate.sendERC1155({
   *   accountId: "67959f7927373a6808679de2",
   *   tokenAddress: "0x...",
   *   to: "0x...",
   *   tokenId: "1",
   *   amount: "20",
   *   data: "0x"
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/estimate/transfer_erc1155/ Xellar Account Abstraction Estimate Send ERC1155 Docs}
   */
  async estimateSendERC1155(
    options: EstimateSendERC1155Options,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<EstimateResponse>
      >(
        '/userOp/sendERC1155/estimate',
        {
          accountId: options.accountId,
          tokenAddress: options.tokenAddress,
          to: options.to,
          tokenId: options.tokenId,
          amount: options.amount,
          data: options.data || '0x',
        },
        config,
      );

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
