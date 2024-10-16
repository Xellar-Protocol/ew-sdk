import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';
import { TransferERC721Config } from '../../wallet/types';

describe('Wallet Transfer ERC721', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('transferERC721', () => {
    it('should successfully transfer ERC721 token', async () => {
      const mockResponse = {
        data: {
          data: {
            txReceipt: {
              hash: '0x4ec81ca3d6a112bdf991a220ed84a3458f061f1f818273c93546ea91a4e1d675',
              from: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
              to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
              contractAddress: '0x1234567890123456789012345678901234567890',
            },
          },
        },
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const transferERC721Config: TransferERC721Config = {
        network: Network.ETHEREUM,
        to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
        tokenId: '123',
        tokenAddress: '0x1234567890123456789012345678901234567890',
      };

      const result = await sdk.wallet.transferERC721(transferERC721Config);

      expect(result).toEqual(mockResponse.data.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/transfer-erc721',
        transferERC721Config,
      );
    });

    it('should throw XellarError on failed ERC721 token transfer', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to transfer ERC721 token',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const transferERC721Config: TransferERC721Config = {
        network: Network.ETHEREUM,
        to: '0x9B9ef330B204bf33316FAf24E3Ed4FfCf57F02C3',
        tokenId: '123',
        tokenAddress: '0x1234567890123456789012345678901234567890',
      };

      await expect(
        sdk.wallet.transferERC721(transferERC721Config),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/transfer-erc721',
        transferERC721Config,
      );
    });
  });
});
