import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Wallet Check Token Balance', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('balanceToken', () => {
    it('should successfully check token balance', async () => {
      const mockResponse = {
        data: {
          data: {
            balance: '1000000000000000000',
            symbol: 'TOKEN',
            address: '0x1234567890123456789012345678901234567890',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.balanceToken({
        tokenAddress: '0x1234567890123456789012345678901234567890',
        network: Network.ETHEREUM,
        walletToken: 'mock-wallet-token',
      });

      expect(result).toEqual({
        balance: '1000000000000000000',
        symbol: 'TOKEN',
        address: '0x1234567890123456789012345678901234567890',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/balance-token',
        {
          network: Network.ETHEREUM,
          tokenAddress: '0x1234567890123456789012345678901234567890',
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });

    it('should throw XellarError on failed token balance check', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to check token balance',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.balanceToken({
          tokenAddress: '0x1234567890123456789012345678901234567890',
          network: Network.ETHEREUM,
          walletToken: 'mock-wallet-token',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/balance-token',
        {
          network: Network.ETHEREUM,
          tokenAddress: '0x1234567890123456789012345678901234567890',
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });
  });

  describe('balanceTokenBatch', () => {
    it('should successfully check batch token balance', async () => {
      const mockResponse = {
        data: {
          data: [
            {
              balance: '1000000000000000000',
              symbol: 'TOKEN1',
              address: '0x1234567890123456789012345678901234567890',
            },
            {
              balance: '2000000000000000000',
              symbol: 'TOKEN2',
              address: '0x0987654321098765432109876543210987654321',
            },
          ],
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.balanceTokenBatch({
        tokenAddresses: [
          '0x1234567890123456789012345678901234567890',
          '0x0987654321098765432109876543210987654321',
        ],
        network: Network.ETHEREUM,
        walletToken: 'mock-wallet-token',
      });

      expect(result).toEqual([
        {
          balance: '1000000000000000000',
          symbol: 'TOKEN1',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          balance: '2000000000000000000',
          symbol: 'TOKEN2',
          address: '0x0987654321098765432109876543210987654321',
        },
      ]);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/batch-balance-token',
        {
          network: Network.ETHEREUM,
          tokenAddresses: [
            '0x1234567890123456789012345678901234567890',
            '0x0987654321098765432109876543210987654321',
          ],
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });

    it('should throw XellarError on failed batch token balance check', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to check batch token balance',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.balanceTokenBatch({
          tokenAddresses: [
            '0x1234567890123456789012345678901234567890',
            '0x0987654321098765432109876543210987654321',
          ],
          network: Network.ETHEREUM,
          walletToken: 'mock-wallet-token',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/batch-balance-token',
        {
          network: Network.ETHEREUM,
          tokenAddresses: [
            '0x1234567890123456789012345678901234567890',
            '0x0987654321098765432109876543210987654321',
          ],
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
