import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Username Authentication', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login with email', () => {
    it('should successfully login with correct email', async () => {
      const mockResponse = {
        data: {
          data: {
            verificationToken: 'mock_verificationToken',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.auth.email.login('test@mail.com');

      expect(result).toEqual('mock_verificationToken');
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login-otp', {
        email: 'test@mail.com',
      });
    });

    it('should throw XellarError on failed login with email', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Unknown error',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(sdk.auth.email.login('wrongemail')).rejects.toThrow(
        XellarError,
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login-otp', {
        email: 'wrongemail',
      });
    });
  });
});
