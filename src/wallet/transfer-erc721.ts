import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { TransactionReceipt, TransferERC721Config } from './types';

export class XellarEWTransferERC721 extends XellarEWBase {
  /**
   * Allows you to transfer an ERC721 token (NFT) on a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `to` (required): The address of the recipient.
   *  - `tokenId` (required): The ID of the ERC721 token to transfer.
   *  - `tokenAddress` (required): The address of the ERC721 token contract.
   *
   * @returns Object of transaction receipt
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.transferERC721({
   *   network: Network.ETHEREUM,
   *   to: '0x1234567890123456789012345678901234567890',
   *   tokenId: '1',
   *   tokenAddress: '0x1234567890123456789012345678901234567890',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Transfer_Erc_721/ Xellar Wallet Transfer ERC721 Docs}
   */
  async transferERC721(config: TransferERC721Config) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >('/wallet/transfer-erc721', {
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
