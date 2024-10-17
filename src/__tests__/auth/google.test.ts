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

    it('should create rampable account if options are provided', async () => {
      const mockResponse = {
        data: {
          data: {
            isWalletCreated: true,
            walletToken: 'mock-wallet-token',
            refreshToken: 'mock-refresh-token',
          },
        },
      };

      const mockRampableResponse = {
        data: {
          data: {
            rampableAccessToken: 'mock-rampable-token',
          },
        },
      };

      mockAxiosInstance.post.mockImplementation(url => {
        if (url === '/auth/google') {
          return Promise.resolve(mockResponse);
        }
        if (url === 'account/rampable/create') {
          return Promise.resolve(mockRampableResponse);
        }
        return Promise.reject(new Error('Unexpected URL'));
      });

      const result = await sdk.auth.google.authorize(
        'mockCredentials',
        undefined,
        {
          rampable: {
            userName: 'testUser',
            fullName: 'Test User',
            password: 'testPassword',
          },
        },
      );

      expect(result).toEqual({
        isWalletCreated: true,
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
        rampableAccessToken: 'mock-rampable-token',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(2);
      expect(mockAxiosInstance.post).toHaveBeenNthCalledWith(
        1,
        '/auth/google',
        {
          credentials: 'mockCredentials',
        },
      );
      expect(mockAxiosInstance.post).toHaveBeenNthCalledWith(
        2,
        'account/rampable/create',
        {
          userName: 'testUser',
          fullName: 'Test User',
          password: 'testPassword',
        },
      );
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
