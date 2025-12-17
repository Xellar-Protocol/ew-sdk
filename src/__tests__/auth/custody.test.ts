import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Custody Authentication', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should successfully register with correct subId', async () => {
      const mockResponse = {
        data: {
          data: {
            accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6.....',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.auth.custody.register('user_sub_id_123');

      expect(result).toEqual({
        accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6.....',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/register-custody',
        {
          subId: 'user_sub_id_123',
        },
      );
    });

    it('should successfully register with different subId', async () => {
      const mockResponse = {
        data: {
          data: {
            accessToken: 'mock-access-token-456',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.auth.custody.register('another_user_sub_id');

      expect(result).toEqual({
        accessToken: 'mock-access-token-456',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/register-custody',
        {
          subId: 'another_user_sub_id',
        },
      );
    });

    it('should throw XellarError on failed register', async () => {
      const mockError = {
        response: {
          data: {
            message: 'SubId already exists',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.auth.custody.register('existing_sub_id'),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/register-custody',
        {
          subId: 'existing_sub_id',
        },
      );
    });

    it('should throw XellarError on network error', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Network error',
            code: 500,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.auth.custody.register('user_sub_id_123'),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/register-custody',
        {
          subId: 'user_sub_id_123',
        },
      );
    });

    it('should throw XellarError when subId is invalid', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Invalid subId format',
            code: 400,
            details: { field: 'subId' },
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(sdk.auth.custody.register('')).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/auth/register-custody',
        {
          subId: '',
        },
      );
    });
  });
});
