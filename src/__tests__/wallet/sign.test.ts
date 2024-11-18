import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';
import {
  SignMessageConfig,
  SignTransactionConfig,
  SignTypedDataConfig,
} from '../../wallet/types';

describe('Wallet Sign', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signMessage', () => {
    it('should successfully sign a message', async () => {
      const mockResponse = {
        data: {
          data: {
            signature: '0x1234567890abcdef',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.signMessage({
        network: Network.ETHEREUM,
        message: 'Hello, world!',
        walletToken: 'mock-wallet-token',
      });

      expect(result).toEqual({ signature: '0x1234567890abcdef' });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        {
          network: Network.ETHEREUM,
          message: 'Hello, world!',
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });

    it('should throw XellarError on failed message signing', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to sign message',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.signMessage({
          network: Network.ETHEREUM,
          message: 'Hello, world!',
          walletToken: 'mock-wallet-token',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        {
          network: Network.ETHEREUM,
          message: 'Hello, world!',
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });
  });

  describe('signTransaction', () => {
    it('should successfully sign a transaction', async () => {
      const mockResponse = {
        data: {
          data: {
            signedTransaction: '0xabcdef1234567890',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.signTransaction({
        network: Network.ETHEREUM,
        transaction: {
          from: '0x1234567890123456789012345678901234567890',
          to: '0x0987654321098765432109876543210987654321',
          value: '0x00',
          data: '0x',
        },
        walletToken: 'mock-wallet-token',
      });

      expect(result).toEqual({ signature: '0xabcdef1234567890' });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        {
          network: Network.ETHEREUM,
          transaction: {
            from: '0x1234567890123456789012345678901234567890',
            to: '0x0987654321098765432109876543210987654321',
            value: '0x00',
            data: '0x',
          },
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });

    it('should throw XellarError on failed transaction signing', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to sign transaction',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.signTransaction({
          network: Network.ETHEREUM,
          transaction: {
            from: '0x1234567890123456789012345678901234567890',
            to: '0x0987654321098765432109876543210987654321',
            value: '0x00',
            data: '0x',
          },
          walletToken: 'mock-wallet-token',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        {
          network: Network.ETHEREUM,
          transaction: {
            from: '0x1234567890123456789012345678901234567890',
            to: '0x0987654321098765432109876543210987654321',
            value: '0x00',
            data: '0x',
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

  describe('signTypedData', () => {
    it('should successfully sign typed data', async () => {
      const mockResponse = {
        data: {
          data: {
            signature: '0xfedcba0987654321',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.wallet.signTypedData({
        network: Network.ETHEREUM,
        data: '0x1234567890abcdef',
        walletToken: 'mock-wallet-token',
      });

      expect(result).toEqual({ signature: '0xfedcba0987654321' });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        {
          network: Network.ETHEREUM,
          data: '0x1234567890abcdef',
        },
        {
          headers: {
            Authorization: 'Bearer mock-wallet-token',
          },
        },
      );
    });

    it('should throw XellarError on failed typed data signing', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to sign typed data',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.signTypedData({
          network: Network.ETHEREUM,
          data: '0x1234567890abcdef',
          walletToken: 'mock-wallet-token',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        {
          network: Network.ETHEREUM,
          data: '0x1234567890abcdef',
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
