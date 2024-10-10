import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Google Authentication', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with correct credentials with expiredDate and wallet is created', async () => {
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

      const result = await sdk.auth.google.authorize('mocCreds', 'mock-date');

      expect(result).toEqual({
        isWalletCreated: true,
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/google', {
        credentials: 'mocCreds',
        expiredDate: 'mock-date',
      });
    });

    it('should successfully login with correct credentials without expiredDate and wallet is created', async () => {
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

      const result = await sdk.auth.google.authorize('mocCreds');

      expect(result).toEqual({
        isWalletCreated: true,
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/google', {
        credentials: 'mocCreds',
      });
    });

    it('should throw XellarError on failed login', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Username or password is incorrect',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(sdk.auth.google.authorize('wrongCreds')).rejects.toThrow(
        XellarError,
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/google', {
        credentials: 'wrongCreds',
      });
    });
  });
});
