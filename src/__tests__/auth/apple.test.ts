import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Apple Authentication', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authorize', () => {
    it('should successfully authorize with correct credential and wallet is created', async () => {
      const mockResponse = {
        data: {
          data: {
            isWalletCreated: true,
            walletToken: 'mock-wallet-token',
            refreshToken: 'mock-refresh-token',
          },
        },
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.auth.apple.authorize('mockCredential');

      expect(result).toEqual({
        isWalletCreated: true,
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/apple', {
        credential: 'mockCredential',
      });
    });

    it('should successfully authorize with correct credential, expireDate, and wallet is not created', async () => {
      const mockResponse = {
        data: {
          data: {
            isWalletCreated: false,
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          },
        },
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.auth.apple.authorize(
        'mockCredential',
        '2024-01-02',
      );

      expect(result).toEqual({
        isWalletCreated: false,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/apple', {
        credential: 'mockCredential',
        expireDate: '2024-01-02',
      });
    });

    it('should throw XellarError on failed authorization', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Invalid credential',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(sdk.auth.apple.authorize('wrongCredential')).rejects.toThrow(
        XellarError,
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/apple', {
        credential: 'wrongCredential',
      });
    });
  });
});
