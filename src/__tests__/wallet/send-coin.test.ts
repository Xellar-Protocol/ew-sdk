import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';
import { SendCoinConfig } from '../../wallet/types';

describe('Wallet Send Coin', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendCoin', () => {
    it('should successfully send coin', async () => {
      const mockResponse = {
        data: {
          data: {
            txReceipt: {
              hash: '0x4ec81ca3d6a112bdf991a220ed84a3458f061f1f818273c93546ea91a4e1d675',
              from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
              to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
              value: '15000000000000000',
            },
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.sendCoin({
        network: Network.ETHEREUM,
        to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
        amount: '0.015',
        walletToken: 'mock-wallet-token',
      });

      expect(result).toEqual({
        txReceipt: {
          hash: '0x4ec81ca3d6a112bdf991a220ed84a3458f061f1f818273c93546ea91a4e1d675',
          from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
          value: '15000000000000000',
        },
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/send-coin',
        {
          network: Network.ETHEREUM,
          to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
          amount: '0.015',
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });

    it('should throw XellarError on failed coin send', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to send coin',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.sendCoin({
          network: Network.ETHEREUM,
          to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
          amount: '0.015',
          walletToken: 'mock-wallet-token',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/send-coin',
        {
          network: Network.ETHEREUM,
          to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
          amount: '0.015',
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
