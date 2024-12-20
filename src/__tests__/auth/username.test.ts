import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Username Authentication', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with correct credentials', async () => {
      const mockResponse = {
        data: {
          data: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            isWalletCreated: false,
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.auth.username.login('testuser', 'testpass');

      expect(result).toEqual({
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        isWalletCreated: false,
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login', {
        username: 'testuser',
        password: 'testpass',
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

      await expect(
        sdk.auth.username.login('wronguser', 'wrongpass'),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/login', {
        username: 'wronguser',
        password: 'wrongpass',
      });
    });
  });

  describe('register', () => {
    it('should successfully register with correct username and password', async () => {
      const mockResponse = {
        data: {
          data: {
            accessToken: 'mock-access-token',
            isWalletCreated: false,
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.auth.username.register('testuser', 'testpass');

      expect(result).toEqual({
        accessToken: 'mock-access-token',
        isWalletCreated: false,
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/register', {
        username: 'testuser',
        password: 'testpass',
      });
    });

    it('should successfully register with rampable option', async () => {
      const mockRegisterResponse = {
        data: {
          data: {
            accessToken: 'mock-access-token',
            isWalletCreated: false,
          },
        },
      };

      mockAxiosInstance.post.mockResolvedValue(mockRegisterResponse);

      const result = await sdk.auth.username.register('testuser', 'testpass');

      expect(result).toEqual({
        accessToken: 'mock-access-token',
        isWalletCreated: false,
      });

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/register', {
        username: 'testuser',
        password: 'testpass',
      });
    });

    it('should throw XellarError on failed register', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Username already exists',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.auth.username.register('existinguser', 'testpass'),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/register', {
        username: 'existinguser',
        password: 'testpass',
      });
    });
  });
});
