import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('WhatsApp Authentication', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully initiate login with correct phone number', async () => {
      const mockResponse = {
        data: {
          data: {
            verifyToken: 'mock-verify-token',
            isWalletCreated: false,
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.auth.whatsapp.login('+1234567890');

      expect(result).toEqual({
        verifyToken: 'mock-verify-token',
        isWalletCreated: false,
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/login-whatsapp',
        {
          phoneNumber: '+1234567890',
        },
      );
    });

    it('should throw XellarError on failed login initiation', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Invalid phone number',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(sdk.auth.whatsapp.login('+1234567890')).rejects.toThrow(
        XellarError,
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/login-whatsapp',
        {
          phoneNumber: '+1234567890',
        },
      );
    });
  });

  describe('verify', () => {
    it('should successfully verify OTP and login with wallet created', async () => {
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

      const result = await sdk.auth.whatsapp.verify(
        'mock-verify-token',
        '123456',
      );

      expect(result).toEqual({
        isWalletCreated: true,
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/verify-whatsapp',
        {
          verificationToken: 'mock-verify-token',
          otp: '123456',
        },
      );
    });

    it('should successfully verify OTP and login without wallet created', async () => {
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

      const result = await sdk.auth.whatsapp.verify(
        'mock-verify-token',
        '123456',
      );

      expect(result).toEqual({
        isWalletCreated: false,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/verify-whatsapp',
        {
          verificationToken: 'mock-verify-token',
          otp: '123456',
        },
      );
    });

    it('should throw XellarError on failed verification', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Invalid OTP',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.auth.whatsapp.verify('mock-verify-token', '123456'),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/verify-whatsapp',
        {
          verificationToken: 'mock-verify-token',
          otp: '123456',
        },
      );
    });
  });
});
