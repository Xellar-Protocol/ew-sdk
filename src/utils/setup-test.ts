import axios from 'axios';

import { XellarSDK } from '..';
import { Config } from '../types/config';

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('axios');

export const setupTests = () => {
  const mockConfig: Config = {
    clientSecret: 'test-client-secret',
    env: 'sandbox',
  };

  const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  };

  mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

  const sdk = new XellarSDK(mockConfig);

  return { sdk, mockedAxios, mockAxiosInstance };
};
