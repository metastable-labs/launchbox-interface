import { useWaitForTransactionReceipt, useWriteContract, useChainId } from 'wagmi';
import { simulateContract } from '@wagmi/core';

import { Address } from 'viem';
import { getTransactionReceipt } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbow/rainbowkit';
import { networks } from '@/config/rainbow/config';

const useDeploy = () => {
  const chainId: any = useChainId();
  const { data: deployHash, isPending: isDeployPending, writeContract, error: deployError } = useWriteContract();

  const { isSuccess: isDeployConfirmed } = useWaitForTransactionReceipt({
    hash: deployHash,
  });

  const currentNetwork = networks.find((network) => network.chainId === chainId);

  const factory = currentNetwork?.launchboxFactory;
  const factoryAbi = currentNetwork?.factoryAbi;

  const deployToken = (tokenName: string, tokenSymbol: string, metadataURI: string, tokenTotalSupply: number) => {
    try {
      writeContract({
        address: factory!,
        abi: factoryAbi,
        functionName: 'deployToken',
        args: [tokenName, tokenSymbol, metadataURI, tokenTotalSupply],
      });
    } catch (error: any) {
      console.log('error occured while deploying token', error);
    }
  };

  const getDeployTransactionData = () => {
    let transactionData;
    if (deployHash) {
      transactionData = getTransactionReceipt(wagmiConfig, { hash: deployHash, chainId });
    }
    return transactionData;
  };

  return {
    deployToken,
    isDeployPending,
    isDeployConfirmed,
    getDeployTransactionData,
    deployError,
    deployHash,
  };
};

const useBuyToken = () => {
  const chainId: any = useChainId();
  const { data: buyHash, isPending: isBuyPending, writeContract, error: buyError } = useWriteContract();

  const { isSuccess: isBuyConfirmed } = useWaitForTransactionReceipt({
    hash: buyHash,
  });

  const currentNetwork = networks.find((network) => network.chainId === chainId);

  const exchangeAbi = currentNetwork?.exchangeAbi;

  const buyToken = async (tokenAddress: Address, tokenAmount: number) => {
    try {
      // await simulateContract(wagmiConfig, {
      //   abi: exchangeAbi,
      //   address: tokenAddress,
      //   functionName: 'buyTokens',
      //   args: [],
      // });

      writeContract({
        address: tokenAddress,
        abi: exchangeAbi,
        functionName: 'buyTokens',
        args: [],
        value: BigInt(tokenAmount),
      });
    } catch (error: any) {
      console.log('error occured while buying token', error);
    }
  };

  const getBuyTransactionData = () => {
    let transactionData;
    if (buyHash) {
      transactionData = getTransactionReceipt(wagmiConfig, { hash: buyHash, chainId });
    }
    return transactionData;
  };

  return {
    buyToken,
    isBuyPending,
    isBuyConfirmed,
    getBuyTransactionData,
    buyError,
    buyHash,
  };
};

const useSellToken = () => {
  const chainId: any = useChainId();
  const { data: sellHash, isPending: isSellPending, writeContract, error: sellError } = useWriteContract();

  const { isSuccess: isSellConfirmed } = useWaitForTransactionReceipt({
    hash: sellHash,
  });

  const currentNetwork = networks.find((network) => network.chainId === chainId);

  const exchangeAbi = currentNetwork?.exchangeAbi;

  const sellToken = (tokenAddress: Address, tokenAmount: number) => {
    try {
      writeContract({
        address: tokenAddress,
        abi: exchangeAbi,
        functionName: 'sellTokens',
        args: [tokenAmount],
      });
    } catch (error: any) {
      console.log('error occured while selling token', error);
    }
  };

  const getSellTransactionData = () => {
    let transactionData;
    if (sellHash) {
      transactionData = getTransactionReceipt(wagmiConfig, { hash: sellHash, chainId });
    }
    return transactionData;
  };

  return {
    sellToken,
    isSellPending,
    isSellConfirmed,
    getSellTransactionData,
    sellError,
    sellHash,
  };
};

const hooks = { useDeploy, useBuyToken, useSellToken };

export default hooks;
