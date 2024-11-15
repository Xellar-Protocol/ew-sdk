import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import {
  EstimateGasConfig,
  EstimateGasResponse,
  WithTokenResponse,
} from './types';

export class XellarEWEstimateGas extends XellarEWBase {
  /**
   * Allows users to estimate gas for transaction using their MPC wallet.
   * @param {EstimateGasConfig} config The configuration for estimating gas.
   *
   * @returns Object of gasLimit, gasPrice, maxFeePerGas, and maxPriorityFeePerGas. If you provide `refreshToken`, the SDK will return the new wallet token and refresh token.
   *  - `gasLimit`: The gas limit for the transaction.
   *  - `gasPrice`: The gas price for the transaction.
   *  - `maxFeePerGas`: The max fee per gas for the transaction.
   *  - `maxPriorityFeePerGas`: The max priority fee per gas for the transaction.
   *  - `refreshToken`?: The new refresh token.
   *  - `walletToken`?: The new wallet token.
   *
   * @example
   *
   * ```typescript
   * // Estimate gas for sending native coin
   * const estimateGasCoin = await sdk.wallet.estimateGas({
   *   type: 'send-coin',
   *   network: 'ethereum',
   *   chainId: '1',
   *   to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
   *   amount: '0.015'
   * });
   *
   * // Estimate gas for sending ERC20 token
   * const estimateGasToken = await sdk.wallet.estimateGas({
   *   type: 'send-token',
   *   network: 'ethereum',
   *   chainId: '1',
   *   to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
   *   amount: '10',
   *   tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
   * });
   *
   * // Estimate gas for transferring ERC721 token
   * const estimateGasERC721 = await sdk.wallet.estimateGas({
   *   type: 'transfer-erc721',
   *   network: 'ethereum',
   *   chainId: '1',
   *   to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
   *   tokenId: '1',
   *   tokenAddress: '0xA468651e0b4F7504aC6390dB567AE937F782d055'
   * });
   *
   * // Estimate gas for transferring ERC1155 token
   * const estimateGasERC1155 = await sdk.wallet.estimateGas({
   *   type: 'transfer-erc1155',
   *   network: 'ethereum',
   *   chainId: '1',
   *   to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
   *   amount: [2, 4],
   *   tokenId: [2, 5],
   *   tokenAddress: '0xeAAab07e113eE423FA1C01ac8dFCac2F6099A5C4'
   * });
   *
   * // Estimate gas for custom transaction
   * const estimateGasCustom = await sdk.wallet.estimateGas({
   *   type: 'custom',
   *   network: 'ethereum',
   *   chainId: '1',
   *   transaction: {
   *     from: '0x5B3A69CD0984c8621c75c54aa4dCA89e382523A9',
   *     to: '0x5B3A69CD0984c8621c75c54aa4dCA89e382523A9',
   *     data: '0x',
   *     nonce: '0x00',
   *     gasPrice: '0x1cb3fa334b',
   *     gasLimit: '0x5208',
   *     value: '0x00'
   *   }
   * });
   * ```
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Estimate_Gas/ Xellar Wallet Estimate Gas Docs}
   */
  async estimateGas(
    config: EstimateGasConfig & { refreshToken: string },
  ): Promise<WithTokenResponse<EstimateGasResponse>>;

  async estimateGas(
    config: EstimateGasConfig & { refreshToken?: undefined },
  ): Promise<EstimateGasResponse>;

  async estimateGas({
    walletToken,
    refreshToken,
    ...config
  }: EstimateGasConfig): Promise<
    WithTokenResponse<EstimateGasResponse> | EstimateGasResponse
  > {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<{ estimateGas: EstimateGasResponse }>
      >(
        '/wallet/estimate-gas"',
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
          ...response.data.data.estimateGas,
          refreshToken: refreshTokenResult.refreshToken,
          walletToken: refreshTokenResult.walletToken,
        };
      }

      return response.data.data.estimateGas;
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
