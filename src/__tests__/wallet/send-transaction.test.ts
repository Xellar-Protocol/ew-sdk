import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';
import { SendTransactionConfig } from '../../wallet/types';

describe('Wallet Send Transaction', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendTransaction', () => {
    it('should successfully send transaction', async () => {
      const mockResponse = {
        data: {
          data: {
            txReceipt: {
              hash: '0x4ec81ca3d6a112bdf991a220ed84a3458f061f1f818273c93546ea91a4e1d675',
              from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
              to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
              value: '0',
              data: '0x1234567890abcdef',
            },
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.sendTransaction({
        network: Network.ETHEREUM,
        transaction: {
          to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
          data: '0x1234567890abcdef',
          from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
        },
        walletToken: 'mock-wallet-token',
      });

      expect(result).toEqual(mockResponse.data.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/send-transaction',
        {
          network: Network.ETHEREUM,
          transaction: {
            to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
            data: '0x1234567890abcdef',
            from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          },
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });

    it('should throw XellarError on failed transaction send', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to send transaction',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.sendTransaction({
          network: Network.ETHEREUM,
          transaction: {
            to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
            data: '0x1234567890abcdef',
            from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          },
          walletToken: 'mock-wallet-token',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/send-transaction',
        {
          network: Network.ETHEREUM,
          transaction: {
            to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
            data: '0x1234567890abcdef',
            from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          },
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });
  });
});
