import { useWaitForTransactionReceipt, useWriteContract, useChainId, useContractWrite } from 'wagmi';
import { writeContract as writeCoreContract } from '@wagmi/core';

import { Address } from 'viem';
import { getTransactionReceipt } from '@wagmi/core';
import { wagmiConfig } from '@/config/rainbow/rainbowkit';
import { networks } from '@/config/rainbow/config';
import { useCallback, useEffect, useState } from 'react';
import { writeContract } from 'viem/actions';

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
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState<Error | unknown>(null);
  const [approveHash, setApproveHash] = useState<`0x${string}` | null>(null);
  const [sellHash, setSellHash] = useState<`0x${string}` | null>(null);
  const [pendingExchangeAddress, setPendingExchangeAddress] = useState<Address | null>(null);
  const [pendingTokenAmount, setPendingTokenAmount] = useState<number | null>(null);
  const [isSellConfirmed, setIsSellConfirmed] = useState(false);

  const { writeContract: writeApprove, data: approveData, error: approveError, isPending: isApprovePending } = useWriteContract();
  const { writeContract: writeSell, data: sellData, error: sellError, isPending: isSellPending } = useWriteContract();

  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash!,
  });

  const { isLoading: isSellLoading, isSuccess: isSellSuccess } = useWaitForTransactionReceipt({
    hash: sellHash!,
  });
  const chainId: any = useChainId();
  const currentNetwork = networks.find((network) => network.chainId === chainId);
  const exchangeAbi = currentNetwork?.exchangeAbi;
  const erc20Abi = currentNetwork?.erc20Abi;

  useEffect(() => {
    if (approveData) {
      setApproveHash(approveData!);
      setStatus('waiting for approval');
    }
  }, [approveData]);

  useEffect(() => {
    if (isApproveSuccess && pendingExchangeAddress && pendingTokenAmount !== null) {
      handleSell(pendingExchangeAddress, pendingTokenAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproveSuccess, pendingExchangeAddress, pendingTokenAmount]);

  useEffect(() => {
    if (sellData) {
      setSellHash(sellData!);
      setStatus('waiting for sell confirmation');
    }
  }, [sellData]);

  useEffect(() => {
    if (isSellSuccess) {
      setStatus('sold');
      setIsSellConfirmed(true);
      setPendingExchangeAddress(null);
      setPendingTokenAmount(null);
    }
  }, [isSellSuccess]);

  const handleApprove = useCallback(
    async (exchangeAddress: Address, tokenAddress: Address, tokenAmount: number) => {
      setStatus('approving');
      setError(null);
      setIsSellConfirmed(false);
      setPendingExchangeAddress(exchangeAddress);
      setPendingTokenAmount(tokenAmount);
      try {
        await writeApprove({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: 'approve',
          args: [exchangeAddress, tokenAmount],
        });
      } catch (err) {
        console.error('Approve Error:', err);
        setError(err);
        setStatus('error');
      }
    },
    [erc20Abi, writeApprove],
  );

  const handleSell = useCallback(
    async (exchangeAddress: Address, tokenAmount: number) => {
      setStatus('selling');

      try {
        await writeSell({
          address: exchangeAddress,
          abi: exchangeAbi,
          functionName: 'sellTokens',
          args: [tokenAmount],
        });
      } catch (err) {
        console.error('Sell Error:', err);
        setError(err!);
        setStatus('error');
      }
    },
    [exchangeAbi, writeSell],
  );

  const getSellTransactionData = () => {
    let transactionData;
    if (sellHash) {
      transactionData = getTransactionReceipt(wagmiConfig, { hash: sellHash, chainId });
    }
    return transactionData;
  };

  const approveAndSell = useCallback(
    async (exchangeAddress: Address, tokenAddress: Address, tokenAmount: number) => {
      handleApprove(exchangeAddress, tokenAddress, tokenAmount);
    },
    [handleApprove],
  );

  return {
    approveAndSell,
    status,
    error,
    approveHash,
    sellHash,
    isApprovePending,
    isApproveLoading,
    isSellPending,
    isSellLoading,
    isSellConfirmed,
    getSellTransactionData,
  };
};

const hooks = { useDeploy, useBuyToken, useSellToken };

export default hooks;
