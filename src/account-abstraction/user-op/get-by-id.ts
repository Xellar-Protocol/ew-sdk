import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../../base';
import { BaseHttpResponse } from '../../types/http';
import { handleError, XellarError } from '../../utils/error';
import { AAGetByIdUserOpResponse } from '../interfaces';

export class XellarAAGetById extends XellarEWBase {
  /**
   * Get a user operation by its ID
   * @param userOpId The unique identifier of the user operation to retrieve
   * @param config Optional Axios request configuration
   * @returns Promise that resolves to the user operation details
   *
   * @example
   *
   * ```typescript
   * const result = await sdk.accountAbstraction.getById("67b1fc9a442f26832dadd881");
   * ```
   *
   * @see {@link https://docs.xellar.co/accountabstraction/api_reference/user_operation/get_by_id/ Xellar Account Abstraction Get User Operation by ID Docs}
   */
  async getById(
    userOpId: string,
    config?: AxiosRequestConfig,
  ): Promise<AAGetByIdUserOpResponse> {
    try {
      const response = await this.aaInstance.get<
        BaseHttpResponse<AAGetByIdUserOpResponse>
      >(`/userOp/${userOpId}`, config);

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
