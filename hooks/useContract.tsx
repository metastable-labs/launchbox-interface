import { useWaitForTransactionReceipt, useWriteContract, useChainId } from 'wagmi';
import { getTransactionReceipt } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbow/rainbowkit';
import { networks } from '@/config/rainbow/config';

const useContract = () => {
  const chainId: any = useChainId();
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const currentNetwork = networks.find((network) => network.chainId === chainId);

  const factory = currentNetwork?.launchboxERC20Factory;
  const factoryAbi = currentNetwork?.factoryAbi;
  const exchangeAbi = currentNetwork?.exchangeAbi;

  const deployToken = (tokenName: string, tokenSymbol: string, tokenDecimals: string, tokenTotalSupply: number) => {
    try {
      writeContract({
        address: factory!,
        abi: factoryAbi,
        functionName: 'createToken',
        args: [tokenName, tokenSymbol, tokenDecimals, tokenTotalSupply],
      });
    } catch (error: any) {
      console.log('error occured while deploying token', error);
    }
  };

  const getTransactionData = () => {
    let transactionData;
    if (hash) {
      transactionData = getTransactionReceipt(wagmiConfig, { hash, chainId });
    }
    return transactionData;
  };

  return {
    deployToken,
    isPending,
    isConfirmed,
    getTransactionData,
    error,
    hash,
  };
};

export default useContract;
