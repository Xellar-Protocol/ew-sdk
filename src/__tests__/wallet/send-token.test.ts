import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';
import { SendTokenConfig } from '../../wallet/types';

describe('Wallet Send Token', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendToken', () => {
    it('should successfully send token', async () => {
      const mockResponse = {
        data: {
          data: {
            txReceipt: {
              hash: '0x4ec81ca3d6a112bdf991a220ed84a3458f061f1f818273c93546ea91a4e1d675',
              from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
              to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
              value: '10000000000000000000',
            },
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const sendTokenConfig: SendTokenConfig = {
        network: Network.ETHEREUM,
        to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
        amount: '10',
        tokenAddress: '0x1234567890123456789012345678901234567890',
      };

      const result = await sdk.wallet.sendToken(sendTokenConfig);

      expect(result).toEqual({
        txReceipt: {
          hash: '0x4ec81ca3d6a112bdf991a220ed84a3458f061f1f818273c93546ea91a4e1d675',
          from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
          value: '10000000000000000000',
        },
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/send-token',
        sendTokenConfig,
      );
    });

    it('should throw XellarError on failed token send', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to send token',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const sendTokenConfig: SendTokenConfig = {
        network: Network.ETHEREUM,
        to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
        amount: '10',
        tokenAddress: '0x1234567890123456789012345678901234567890',
      };

      await expect(sdk.wallet.sendToken(sendTokenConfig)).rejects.toThrow(
        XellarError,
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/send-token',
        sendTokenConfig,
      );
    });
  });
});
