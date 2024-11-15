import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Wallet Cancel Transaction', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('cancelTransaction', () => {
    it('should successfully cancel a transaction', async () => {
      const mockResponse = {
        data: {
          data: {
            hash: 'mock-transaction-hash',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.cancelTransaction({
        network: Network.ETHEREUM,
        nonce: 1234567890,
        walletToken: 'mock-wallet-token',
      });

      expect(result).toEqual({ hash: 'mock-transaction-hash' });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/cancel-transaction',
        {
          network: Network.ETHEREUM,
          nonce: 1234567890,
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });

    it('should throw XellarError on failed transaction cancellation', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to cancel transaction',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.cancelTransaction({
          network: Network.ETHEREUM,
          nonce: 1234567890,
          walletToken: 'mock-wallet-token',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/cancel-transaction',
        {
          network: Network.ETHEREUM,
          nonce: 1234567890,
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
