import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  TransactionReceipt,
  TransferERC721Config,
  WithTokenResponse,
} from './types';

export class XellarEWTransferERC721 extends XellarEWBase {
  /**
   * Allows you to transfer an ERC721 token (NFT) on a blockchain network
   * @param config Configuration object.
   *
   *  - `network` (required): The network used for transactions.
   *  - `to` (required): The address of the recipient.
   *  - `tokenId` (required): The ID of the ERC721 token to transfer.
   *  - `tokenAddress` (required): The address of the ERC721 token contract.
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of transaction receipt. If you provide `refreshToken`, the SDK will return the new `refreshToken` and `walletToken`.
   *
   * @example
   *
   * ```typescript
   * const receipt = await sdk.wallet.transferERC721({
   *   network: Network.ETHEREUM,
   *   to: '0x1234567890123456789012345678901234567890',
   *   tokenId: '1',
   *   tokenAddress: '0x1234567890123456789012345678901234567890',
   *   walletToken: 'your-wallet-token',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Transfer_Erc_721/ Xellar Wallet Transfer ERC721 Docs}
   */
  async transferERC721(
    config: TransferERC721Config & { refreshToken: string },
  ): Promise<WithTokenResponse<TransactionReceipt>>;

  async transferERC721(
    config: TransferERC721Config & { refreshToken?: undefined },
  ): Promise<TransactionReceipt>;

  async transferERC721({
    walletToken,
    refreshToken,
    ...config
  }: TransferERC721Config): Promise<
    TransactionReceipt | WithTokenResponse<TransactionReceipt>
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >(
        '/wallet/transfer-erc721',
        {
          ...config,
        },
        {
          headers: {
            Authorization: `Bearer ${walletToken}`,
          },
        },
      );

      if (refreshToken) {
        const refreshTokenResult = await this._refreshToken(refreshToken);

        return {
          ...response.data.data,
          refreshToken: refreshTokenResult.refreshToken,
          walletToken: refreshTokenResult.walletToken,
        };
      }

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
