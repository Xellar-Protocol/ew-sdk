import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Google Authentication', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authorize', () => {
    it('should successfully authorize with telegram data', async () => {
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

      const body = {
        data: {
          id: '123456789',
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          photo_url: 'https://t.me/i/userpic/320/johndoe.jpg',
          auth_date: '1630510000',
          hash: 'hash',
        },
        botUsername: 'your_bot_username',
        expireDate: '2024-01-02',
      };

      const result = await sdk.auth.telegram.authorize(body);

      expect(result).toEqual({
        isWalletCreated: true,
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/telegram', {
        data: {
          id: '123456789',
          first_name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          photo_url: 'https://t.me/i/userpic/320/johndoe.jpg',
          auth_date: '1630510000',
          hash: 'hash',
        },
        botUsername: 'your_bot_username',
        expireDate: '2024-01-02',
      });
    });

    it('should successfully authorize with telegram dataString', async () => {
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

      const body = {
        dataString: 'datastring',
        botUsername: 'your_bot_username',
        expireDate: '2024-01-02',
      };

      const result = await sdk.auth.telegram.authorize(body);

      expect(result).toEqual({
        isWalletCreated: true,
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
      });

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/telegram', {
        dataString: 'datastring',
        botUsername: 'your_bot_username',
        expireDate: '2024-01-02',
      });
    });

    it('should throw XellarError on failed authorize', async () => {
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
        sdk.auth.telegram.authorize({
          dataString: 'datastring',
          botUsername: 'your_bot_username',
          expiredDate: '2024-01-02',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/auth/telegram', {
        dataString: 'datastring',
        botUsername: 'your_bot_username',
        expiredDate: '2024-01-02',
      });
    });
  });
});
