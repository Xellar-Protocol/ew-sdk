import { AxiosRequestConfig } from 'axios';

import { XellarEWBase } from '../base';
import { BaseHttpResponse } from '../types/http';
import { handleError, XellarError } from '../utils/error';
import { AACreateAccountOptions, AACreateAccountResponse } from './interfaces';

export class XellarAAAuth extends XellarEWBase {
  /**
   * Create a new smart account
   * @param options - Options for creating a smart account
   * @returns The created smart account
   */
  async createAccount(
    { owner }: AACreateAccountOptions,
    config?: AxiosRequestConfig,
  ) {
    try {
      const response = await this.aaInstance.post<
        BaseHttpResponse<AACreateAccountResponse>
      >(
        '/smart-account',
        {
          owner: {
            id: owner.id,
            provider: owner.provider,
          },
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
