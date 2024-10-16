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

      const signMessageConfig: SignMessageConfig = {
        network: Network.ETHEREUM,
        message: 'Hello, world!',
      };

      const result = await sdk.wallet.signMessage(signMessageConfig);

      expect(result).toEqual('0x1234567890abcdef');
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        signMessageConfig,
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

      const signMessageConfig: SignMessageConfig = {
        network: Network.ETHEREUM,
        message: 'Hello, world!',
      };

      await expect(sdk.wallet.signMessage(signMessageConfig)).rejects.toThrow(
        XellarError,
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        signMessageConfig,
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

      const signTransactionConfig: SignTransactionConfig = {
        network: Network.ETHEREUM,
        transaction: {
          from: '0x1234567890123456789012345678901234567890',
          to: '0x0987654321098765432109876543210987654321',
          value: '0x00',
          data: '0x',
        },
      };

      const result = await sdk.wallet.signTransaction(signTransactionConfig);

      expect(result).toEqual('0xabcdef1234567890');
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        signTransactionConfig,
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

      const signTransactionConfig: SignTransactionConfig = {
        network: Network.ETHEREUM,
        transaction: {
          from: '0x1234567890123456789012345678901234567890',
          to: '0x0987654321098765432109876543210987654321',
          value: '0x00',
          data: '0x',
        },
      };

      await expect(
        sdk.wallet.signTransaction(signTransactionConfig),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        signTransactionConfig,
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

      const signTypedDataConfig: SignTypedDataConfig = {
        network: Network.ETHEREUM,
        data: '0x1234567890abcdef',
      };

      const result = await sdk.wallet.signTypedData(signTypedDataConfig);

      expect(result).toEqual('0xfedcba0987654321');
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        signTypedDataConfig,
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

      const signTypedDataConfig: SignTypedDataConfig = {
        network: Network.ETHEREUM,
        data: '0x1234567890abcdef',
      };

      await expect(
        sdk.wallet.signTypedData(signTypedDataConfig),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/sign-message',
        signTypedDataConfig,
      );
    });
  });
});
