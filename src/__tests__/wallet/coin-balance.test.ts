import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Wallet Check Coin Balance', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('balanceCoin', () => {
    it('should successfully check coin balance', async () => {
      const mockResponse = {
        data: {
          data: {
            balance: '1000000000000000000',
            symbol: 'ETH',
            address: '0x1234567890123456789012345678901234567890',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.balanceCoin(Network.ETHEREUM);

      expect(result).toEqual({
        balance: '1000000000000000000',
        symbol: 'ETH',
        address: '0x1234567890123456789012345678901234567890',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/balance-coin',
        {
          network: Network.ETHEREUM,
        },
      );
    });

    it('should throw XellarError on failed balance check', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to check balance',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(sdk.wallet.balanceCoin(Network.ETHEREUM)).rejects.toThrow(
        XellarError,
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/balance-coin',
        {
          network: Network.ETHEREUM,
        },
      );
    });
  });
});
