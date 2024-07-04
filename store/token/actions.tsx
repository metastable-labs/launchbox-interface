'use client';
import { useEffect, useState } from 'react';
import { Address, decodeEventLog, formatEther } from 'viem';
import { toast } from 'react-toastify';
import { useChainId, useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';

import { trim } from 'viem';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import useContract from '@/hooks/useContract';
import { networks } from '@/config/config';
import {
  setLoading,
  setLoadingCreate,
  setToken,
  setTokens,
  setMeta,
  setExtraTokens,
  setExtraUserTokens,
  setUserTokens,
  setUserTokensLoading,
  setUserTokensMeta,
  setLoadingBuy,
  setCoinPrice,
  setLoadingAnalytics,
  setAnalytics,
  setOneDayAnalytics,
  setOneHourAnalytics,
  setOneMonthAnalytics,
  setOneWeekAnalytics,
} from '.';
import { CallbackProps } from '..';
import api from './api';
import { TokenData } from './types';
import { wagmiConfig } from '@/config/privy-provider';
import LaunchBoxExchange from '@/config/abis/LaunchBoxExchange.json';

const useTokenActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();
  const { deployToken, isDeployPending, isDeployConfirmed, getDeployTransactionData } = useContract.useDeploy();
  const { buyToken, isBuyPending, isBuyConfirmed, getBuyTransactionData, buyError } = useContract.useBuyToken();
  const { approveAndSell, isSellPending, getSellTransactionData, error, isApprovePending, isSellConfirmed, isApproveLoading, isSellLoading } = useContract.useSellToken();
  const chainId = useChainId();
  const { address } = useAccount();

  const [deployData, setDeployData] = useState<TokenData>();

  const getTokens = async (query: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const { meta, tokens } = await api.fetchTokens(query);

      dispatch(setMeta(meta));
      if (meta.skip === 0) {
        dispatch(setTokens(tokens));
      } else {
        dispatch(setExtraTokens(tokens));
      }
      return callback?.onSuccess?.(tokens);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getUserTokens = async (query: string, callback?: CallbackProps) => {
    try {
      dispatch(setUserTokensLoading(true));
      const { meta, tokens } = await api.fetchTokens(query);

      dispatch(setUserTokensMeta(meta));
      if (meta.skip === 0) {
        dispatch(setUserTokens(tokens));
      } else {
        dispatch(setExtraUserTokens(tokens));
      }
      return callback?.onSuccess?.(tokens);
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setUserTokensLoading(false));
    }
  };

  const getCoinPrice = async () => {
    try {
      const coinPrice = await api.fetchCoinPrice();
      dispatch(setCoinPrice(coinPrice));
    } catch (error: any) {
      console.log(error);
    }
  };

  const getToken = async (id: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const token = await api.fetchToken(id);

      const item = {
        ...token,
      };

      dispatch(setToken(item));
      return callback?.onSuccess?.(token);
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createToken = async (data: TokenData, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingCreate(true));
      dispatch(setToken(undefined));
      setDeployData(data);

      return deployToken(data.token_name, data.token_symbol, 'https://', data.token_total_supply * 10 ** 18);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    }
  };

  const buyTokens = async (exchangeAddress: Address, amount: number) => {
    try {
      dispatch(setLoadingBuy(true));

      return buyToken(exchangeAddress, amount * 10 ** 18);
    } catch (error: any) {
      dispatch(setLoadingBuy(false));
      //
    }
  };

  const sellTokens = async (exchangeAddress: Address, tokenAddress: Address, amount: number) => {
    try {
      dispatch(setLoadingBuy(true));

      return await approveAndSell(exchangeAddress, tokenAddress, amount * 10 ** 18);
    } catch (error: any) {
      //
    }
  };

  const calculateSellTokenAmount = async (exchangeAddress: Address, amount: number) => {
    try {
      const result: any = await readContract(wagmiConfig, {
        abi: LaunchBoxExchange.abi,
        address: exchangeAddress,
        functionName: 'calculateSaleTokenOut',
        args: [amount * 10 ** 18],
      });

      const value = formatEther(result[0]);

      return Number(value);
    } catch (error: any) {
      console.log(error);
    }
  };

  const calculateBuyTokenAmount = async (exchangeAddress: Address, amount: number) => {
    try {
      const result: any = await readContract(wagmiConfig, {
        abi: LaunchBoxExchange.abi,
        address: exchangeAddress,
        functionName: 'calculatePurchaseTokenOut',
        args: [amount * 10 ** 18],
      });

      const value = formatEther(result[0]);

      return Number(value);
    } catch (error: any) {
      console.log(error);
    }
  };

  const getOneHourAnalytics = async (tokenId: string, callback?: CallbackProps) => {
    try {
      const response = await api.fetchPriceAnalytics(tokenId, '1h');

      dispatch(setOneHourAnalytics(response));

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      callback?.onError?.(error);
    }
  };

  const getOneDayAnalytics = async (tokenId: string, callback?: CallbackProps) => {
    try {
      const response = await api.fetchPriceAnalytics(tokenId, '24h');

      dispatch(setOneDayAnalytics(response));

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      callback?.onError?.(error);
    }
  };

  const getOneWeekAnalytics = async (tokenId: string, callback?: CallbackProps) => {
    try {
      const response = await api.fetchPriceAnalytics(tokenId, '1w');

      dispatch(setOneWeekAnalytics(response));

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      callback?.onError?.(error);
    }
  };

  const getOneMonthAnalytics = async (tokenId: string, callback?: CallbackProps) => {
    try {
      const response = await api.fetchPriceAnalytics(tokenId, '1m');

      dispatch(setOneMonthAnalytics(response));

      return callback?.onSuccess?.(response);
    } catch (error: any) {
      callback?.onError?.(error);
    }
  };

  const getAnalytics = async (tokenId: string, period: '1h' | '24h' | '1w' | '1m', callback?: CallbackProps) => {
    const _actions = {
      '1h': getOneHourAnalytics,
      '24h': getOneDayAnalytics,
      '1w': getOneWeekAnalytics,
      '1m': getOneMonthAnalytics,
    };

    try {
      if (tokenState.analytics) {
        return _actions[period](tokenId, callback);
      } else {
        dispatch(setLoadingAnalytics(true));

        const response = await api.fetchPriceAnalytics(tokenId, '1w');
        dispatch(setAnalytics(response));
        dispatch(setLoadingAnalytics(false));
        getOneHourAnalytics(tokenId);
        getOneDayAnalytics(tokenId);
        getOneMonthAnalytics(tokenId);

        return callback?.onSuccess?.(response);
      }
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingAnalytics(false));
    }
  };

  const _submitData = async () => {
    try {
      if (isDeployPending || !isDeployConfirmed) return;

      const currentNetwork = networks.find((network) => network.chainId === chainId);

      const txData = await getDeployTransactionData();

      const topics = txData?.logs?.[6]?.topics;
      const data = txData?.logs?.[6]?.data;
      const decodedEvent: any = await decodeEventLog({ abi: currentNetwork?.factoryAbi!, topics: topics!, data: data });

      const token_address = decodedEvent?.args?.tokenAddress;
      const exchange_address = decodedEvent?.args?.launchboxExchangeAddress;
      const converted_block_number = Number(txData?.blockNumber);

      const formData = new FormData();
      formData.append('logo', deployData?.logo as File);
      formData.append('token_name', deployData?.token_name!);
      formData.append('token_symbol', deployData?.token_symbol!);
      formData.append('token_address', trim(token_address as Address));
      formData.append('token_total_supply', deployData?.token_total_supply! as unknown as string);
      formData.append('create_token_page', deployData?.create_token_page! as any);
      formData.append('token_decimals', '18');
      formData.append('exchange_address', exchange_address);

      if (deployData?.warpcast_channel_link) {
        formData.append('warpcast_channel_link', deployData?.warpcast_channel_link!);
      }

      if (deployData?.website_url) {
        formData.append('website_url', deployData?.website_url!);
      }

      if (deployData?.socials) {
        const channel = JSON.stringify({ ...deployData?.socials });
        formData.append('socials', channel);
      }

      let chain = {
        id: chainId,
        name: 'base',
        deployer_address: address,
        transaction_hash: txData?.transactionHash,
        block_number: converted_block_number,
      };

      formData.append('chain', JSON.stringify(chain));

      const response = await api.createToken(formData);

      dispatch(setToken(response));

      getTokens('take=50');
    } catch (e) {
      //
    } finally {
      dispatch(setLoadingCreate(false));
    }
  };

  const _getMarketCap = async (exchange_address: Address) => {
    try {
      const result: any = await readContract(wagmiConfig, {
        abi: LaunchBoxExchange.abi,
        address: exchange_address,
        functionName: 'marketCap',
        args: [],
      });
      const formatted = formatEther(result);
      const marketCapValue = Number(formatted);

      return marketCapValue;
    } catch (error) {
      return 0;
    }
  };

  const _getTokenPrice = async (exchange_address: Address) => {
    try {
      const result: any = await readContract(wagmiConfig, {
        abi: LaunchBoxExchange.abi,
        address: exchange_address,
        functionName: 'getTokenPriceinETH',
        args: [],
      });
      const formatted = formatEther(result);

      return formatted;
    } catch (error) {
      return 0;
    }
  };

  useEffect(() => {
    _submitData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeployPending, isDeployConfirmed, tokenState.loadingCreate]);

  useEffect(() => {
    if (!isBuyConfirmed || isBuyPending) return;

    if (buyError?.message) {
      toast('An error occured! Please try again later.', {
        type: 'error',
      });
      dispatch(setLoadingBuy(false));

      return;
    }

    dispatch(setLoadingBuy(false));
    toast('Token purchase is successful!', {
      type: 'success',
    });
    getBuyTransactionData()?.then((res) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuyPending, isBuyConfirmed, buyError]);

  useEffect(() => {
    if (isApprovePending || isSellPending) return;

    if (error) {
      toast('An error occured! Please try again later.', {
        type: 'error',
      });
      dispatch(setLoadingBuy(false));

      return;
    }

    dispatch(setLoadingBuy(false));
    if (isSellConfirmed) {
      toast('Token sell is successful!', {
        type: 'success',
      });
    }

    getSellTransactionData()?.then((res) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSellPending, isSellConfirmed, error]);

  return {
    getTokens,
    getUserTokens,
    getToken,
    createToken,
    buyTokens,
    calculateSellTokenAmount,
    calculateBuyTokenAmount,
    sellTokens,
    getCoinPrice,
    getAnalytics,
  };
};

export default useTokenActions;
