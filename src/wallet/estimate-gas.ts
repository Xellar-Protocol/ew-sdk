import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { EstimateGasConfig, EstimateGasResponse } from './types';

export class XellarEWEstimateGas extends XellarEWBase {
  /**
   * Allows users to estimate gas for transaction using their MPC wallet.
   * @param {EstimateGasConfig} config The configuration for estimating gas.
   *
   * @returns Object of gasLimit, gasPrice, maxFeePerGas, and maxPriorityFeePerGas
   *
   * @example
   *
   * ```typescript
   * const hash = await sdk.wallet.estimateGas({
   *   type: 'send-coin',
   *   network: Network.ETHEREUM,
   *   to: '0x1234567890123456789012345678901234567890',
   *   amount: 0.123,
   * });
   *
   *
   * @see {@link https://docs.xellar.co/embeddedwallets/how_to/wallet_operation/Estimate_Gas/ Xellar Wallet Estimate Gas Docs}
   */
  async estimateGas(config: EstimateGasConfig) {
    try {
      const response = await this.axiosInstance.post<
        BaseHttpResponse<{ estimateGas: EstimateGasResponse }>
      >('/wallet/estimate-gas"', {
        ...config,
      });

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
