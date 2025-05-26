import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { TopUpByTxOptions, TopUpHistoryDTO } from '../interfaces';

export class XellarAAGasTankTopUp extends XellarEWBase {
  /**
   * Top up a gas tank using a transaction
   * @param options Configuration object.
   *
   *  - `txHash` (required): The transaction hash of the top-up transaction.
   *  - `chainId` (required): The chain ID where the transaction was sent.
   *  - `receiverOwnerId` (required): The ID of the owner who will receive the top-up.
   *  - `tokenAddress` (required): The address of the token being used for top-up.
   *  - `poolAddress` (required): The address of the pool contract.
   *  - `immediate` (optional): Whether to process the top-up immediately.
   *  - `signature` (required): The signature for the top-up request.
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.gasTank.topUp({
   *   txHash: "0x...",
   *   chainId: 11155111,
   *   receiverOwnerId: "67b1f9310521667c3e94d625",
   *   tokenAddress: "0x...",
   *   poolAddress: "0x...",
   *   immediate: true,
   *   signature: "0x..."
   * });
   * // Returns:
   * // {
   * //   id: "...",
   * //   createdAt: "...",
   * //   updatedAt: "...",
   * //   clientId: "...",
   * //   appId: "...",
   * //   ownerId: "...",
   * //   txHash: "0x...",
   * //   network: "sepolia",
   * //   chainId: 11155111,
   * //   poolAddress: "0x...",
   * //   amount: "1000000000000000000",
   * //   tokenAddress: "0x...",
   * //   status: "pending",
   * //   failReason: null
   * // }
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/gas_tank/top_up/ Xellar Account Abstraction Gas Tank Top Up Docs}
   */
  async topUp(options: TopUpByTxOptions): Promise<TopUpHistoryDTO> {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<TopUpHistoryDTO>
      >('/smart-account/topUp', {
        txHash: options.txHash,
        chainId: options.chainId,
        receiverOwnerId: options.receiverOwnerId,
        tokenAddress: options.tokenAddress,
        poolAddress: options.poolAddress,
        immediate: options.immediate,
        signature: options.signature,
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
