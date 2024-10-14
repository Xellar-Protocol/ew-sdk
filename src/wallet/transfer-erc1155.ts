import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { TransactionReceipt, TransferERC1155Config } from './types';

export class XellarEWTransferERC1155 extends XellarEWBase {
  /**
   * Allows you to transfer ERC1155 tokens on a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `to` (required): The address of the recipient.
   *  - `amount` (required): Token amount(s) to transfer. Array for batch transfer, single value for single transfer.
   *  - `tokenId` (required): Token ID(s) to transfer. Array for batch transfer, single value for single transfer.
   *  - `tokenAddress` (required): The address of the ERC1155 token contract.
   *
   * @returns Object of transaction receipt
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.transferERC1155({
   *   network: Network.ETHEREUM,
   *   to: '0x1234567890123456789012345678901234567890',
   *   amount: [2, 4],
   *   tokenId: [2, 5],
   *   tokenAddress: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Transfer_Erc_1155/ Xellar Wallet Transfer ERC1155 Docs}
   */
  async transferERC1155(config: TransferERC1155Config) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >('/wallet/transfer-erc1155', {
        ...config,
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
