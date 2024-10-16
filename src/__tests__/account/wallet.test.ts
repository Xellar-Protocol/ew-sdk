import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Account Wallet', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a new MPC wallet', async () => {
      const mockResponse = {
        data: {
          data: {
            walletToken: 'mock-wallet-token',
            refreshToken: 'mock-refresh-token',
            secret0: 'mock-secret0',
            secret0Link: 'mock-secret0-link',
            address: 'mock-address',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.account.wallet.create();

      expect(result).toEqual({
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
        secret0: 'mock-secret0',
        secret0Link: 'mock-secret0-link',
        address: 'mock-address',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/account/create',
        {},
      );
    });

    it('should successfully create a new MPC wallet with expireDate', async () => {
      const mockResponse = {
        data: {
          data: {
            walletToken: 'mock-wallet-token',
            refreshToken: 'mock-refresh-token',
            secret0: 'mock-secret0',
            secret0Link: 'mock-secret0-link',
            address: 'mock-address',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await sdk.account.wallet.create('2024-01-01');

      expect(result).toEqual({
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
        secret0: 'mock-secret0',
        secret0Link: 'mock-secret0-link',
        address: 'mock-address',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/account/create', {
        expireDate: '2024-01-01',
      });
    });

    it('should throw XellarError on failed wallet creation', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to create wallet',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(sdk.account.wallet.create()).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/account/create',
        {},
      );
    });
  });

  describe('recover', () => {
    it('should successfully recover an MPC wallet', async () => {
      const mockResponse = {
        data: {
          data: {
            walletToken: 'mock-wallet-token',
            refreshToken: 'mock-refresh-token',
            secret0: 'mock-secret0',
            secret0Link: 'mock-secret0-link',
            address: 'mock-address',
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const mockFormData = new FormData();
      mockFormData.append(
        'file',
        new Blob(['mock-file-content'], { type: 'text/plain' }),
        'secret.txt',
      );

      const result = await sdk.account.wallet.recover(mockFormData);

      expect(result).toEqual({
        walletToken: 'mock-wallet-token',
        refreshToken: 'mock-refresh-token',
        secret0: 'mock-secret0',
        secret0Link: 'mock-secret0-link',
        address: 'mock-address',
      });
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/account/recover',
        mockFormData,
      );
    });

    it('should throw XellarError on failed wallet recovery', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to recover wallet',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const mockFormData = new FormData();
      mockFormData.append(
        'file',
        new Blob(['mock-file-content'], { type: 'text/plain' }),
        'secret.txt',
      );

      await expect(sdk.account.wallet.recover(mockFormData)).rejects.toThrow(
        XellarError,
      );

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/account/recover',
        mockFormData,
      );
    });
  });
});
