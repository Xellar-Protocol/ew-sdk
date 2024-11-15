import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  TransactionReceipt,
  TransferERC1155Config,
  WithTokenResponse,
} from './types';

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
   *  - `walletToken` (required): The wallet token for authentication.
   *  - `refreshToken` (optional): The refresh token for authentication. Use this if you want to allow SDK automatically refresh the wallet token.
   *
   * @returns Object of transaction receipt. If you provide `refreshToken`, the SDK will return the new `refreshToken` and `walletToken`.
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
   *   walletToken: 'your-wallet-token',
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Transfer_Erc_1155/ Xellar Wallet Transfer ERC1155 Docs}
   */
  async transferERC1155(
    config: TransferERC1155Config & { refreshToken: string },
  ): Promise<WithTokenResponse<TransactionReceipt>>;

  async transferERC1155(
    config: TransferERC1155Config & { refreshToken?: undefined },
  ): Promise<TransactionReceipt>;

  async transferERC1155({
    walletToken,
    refreshToken,
    ...config
  }: TransferERC1155Config): Promise<
    TransactionReceipt | WithTokenResponse<TransactionReceipt>
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<TransactionReceipt>
      >(
        '/wallet/transfer-erc1155',
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
