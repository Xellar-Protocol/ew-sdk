import { Network } from '../../types/chain';
import { XellarError } from '../../utils/error';
import { setupTests } from '../../utils/setup-test';

describe('Wallet Estimate Gas', () => {
  const { sdk, mockAxiosInstance } = setupTests();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('estimateGas', () => {
    const mockEstimateGasResponse = {
      data: {
        data: {
          estimateGas: {
            gasLimit: '21000',
            gasPrice: '6776647976',
            maxFeePerGas: '14457061074',
            maxPriorityFeePerGas: '1000000000',
          },
        },
      },
    };

    it('should successfully estimate gas for send-coin transaction', async () => {
      mockAxiosInstance.post.mockResolvedValue(mockEstimateGasResponse);

      const result = await sdk.wallet.estimateGas({
        type: 'send-coin',
        network: Network.ETHEREUM,
        to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
        amount: '0.015',
      });

      expect(result).toEqual(mockEstimateGasResponse.data.data.estimateGas);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/estimate-gas"',
        {
          type: 'send-coin',
          network: Network.ETHEREUM,
          to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          amount: '0.015',
        },
      );
    });

    it('should successfully estimate gas for send-token transaction', async () => {
      mockAxiosInstance.post.mockResolvedValue(mockEstimateGasResponse);

      const result = await sdk.wallet.estimateGas({
        type: 'send-token',
        network: Network.ETHEREUM,
        to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
        amount: '10',
        tokenAddress: '0x1234567890123456789012345678901234567890',
      });

      expect(result).toEqual(mockEstimateGasResponse.data.data.estimateGas);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/estimate-gas"',
        {
          type: 'send-token',
          network: Network.ETHEREUM,
          to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          amount: '10',
          tokenAddress: '0x1234567890123456789012345678901234567890',
        },
      );
    });

    it('should successfully estimate gas for transfer-erc721 transaction', async () => {
      mockAxiosInstance.post.mockResolvedValue(mockEstimateGasResponse);

      const result = await sdk.wallet.estimateGas({
        type: 'transfer-erc721',
        network: Network.ETHEREUM,
        to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
        tokenId: '123',
        tokenAddress: '0x1234567890123456789012345678901234567890',
      });

      expect(result).toEqual(mockEstimateGasResponse.data.data.estimateGas);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/estimate-gas"',
        {
          type: 'transfer-erc721',
          network: Network.ETHEREUM,
          to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          tokenId: '123',
          tokenAddress: '0x1234567890123456789012345678901234567890',
        },
      );
    });

    it('should successfully estimate gas for transfer-erc1155 transaction', async () => {
      mockAxiosInstance.post.mockResolvedValue(mockEstimateGasResponse);

      const result = await sdk.wallet.estimateGas({
        type: 'transfer-erc1155',
        network: Network.ETHEREUM,
        to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
        tokenId: '123',
        amount: '5',
        tokenAddress: '0x1234567890123456789012345678901234567890',
      });

      expect(result).toEqual(mockEstimateGasResponse.data.data.estimateGas);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/estimate-gas"',
        {
          type: 'transfer-erc1155',
          network: Network.ETHEREUM,
          to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          tokenId: '123',
          amount: '5',
          tokenAddress: '0x1234567890123456789012345678901234567890',
        },
      );
    });

    it('should successfully estimate gas for custom transaction', async () => {
      mockAxiosInstance.post.mockResolvedValue(mockEstimateGasResponse);

      const result = await sdk.wallet.estimateGas({
        type: 'custom',
        network: Network.ETHEREUM,
        transaction: {
          from: '0x5B3A69CD0984c8621c75c54aa4dCA89e382523A9',
          to: '0x5B3A69CD0984c8621c75c54aa4dCA89e382523A9',
          data: '0x',
          nonce: '0x00',
          gasPrice: '0x1cb3fa334b',
          gasLimit: '0x5208',
          value: '0x00',
        },
      });

      expect(result).toEqual(mockEstimateGasResponse.data.data.estimateGas);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/estimate-gas"',
        {
          type: 'custom',
          network: Network.ETHEREUM,
          transaction: {
            from: '0x5B3A69CD0984c8621c75c54aa4dCA89e382523A9',
            to: '0x5B3A69CD0984c8621c75c54aa4dCA89e382523A9',
            data: '0x',
            nonce: '0x00',
            gasPrice: '0x1cb3fa334b',
            gasLimit: '0x5208',
            value: '0x00',
          },
        },
      );
    });

    it('should throw XellarError on failed gas estimation', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Failed to estimate gas',
            code: 400,
            details: {},
          },
        },
      };
      mockAxiosInstance.post.mockRejectedValue(mockError);

      await expect(
        sdk.wallet.estimateGas({
          type: 'send-coin',
          network: Network.ETHEREUM,
          to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          amount: '0.015',
        }),
      ).rejects.toThrow(XellarError);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/wallet/estimate-gas"',
        {
          type: 'send-coin',
          network: Network.ETHEREUM,
          to: '0xBfE64B4b628E0998A03e2522B051Cf1B4661c964',
          amount: '0.015',
        },
      );
    });
  });
});
