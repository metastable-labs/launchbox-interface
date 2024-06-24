'use client';
import { useEffect, useState } from 'react';
import { Address, decodeEventLog, formatEther } from 'viem';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useChainId, useAccount } from 'wagmi';
import { readContract, writeContract } from '@wagmi/core';

import { mode } from 'wagmi/chains';
import { trim } from 'viem';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import useContract from '@/hooks/useContract';
import { networks } from '@/config/rainbow/config';
import { setLoading, setLoadingCreate, setToken, setTokens, setMeta, setExtraTokens, setLoadingBuy, setCoinPrice } from '.';
import { CallbackProps } from '..';
import api from './api';
import { Token, TokenData } from './types';
import { wagmiConfig } from '@/config/rainbow/rainbowkit';
import LaunchBoxExchange from '@/config/rainbow/abis/LaunchBoxExchange.json';

const useTokenActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();
  const { deployToken, isDeployPending, isDeployConfirmed, getDeployTransactionData } = useContract.useDeploy();
  const { buyToken, isBuyPending, isBuyConfirmed, getBuyTransactionData, buyError } = useContract.useBuyToken();
  const { sellToken, isSellPending, isSellConfirmed, getSellTransactionData, sellError } = useContract.useSellToken();
  const chainId = useChainId();
  const { address } = useAccount();

  const [deployData, setDeployData] = useState<TokenData>();

  const getTokens = async (query: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const coinPrice = await api.fetchCoinPrice();
      dispatch(setCoinPrice(coinPrice));
      const { meta, tokens } = await api.fetchTokens(query);

      const tokensRespose: Token[] = [];

      for (const token of tokens) {
        if (!token.exchange_address) {
          tokensRespose.push({ ...token, market_cap: 0 });
          continue;
        }

        const marketCapValue = await _getMarketCap(token.exchange_address);

        const tokenPriceInEth = await _getTokenPrice(token.exchange_address);
        const tokenPriceInUSD = coinPrice.price * Number(tokenPriceInEth);

        const factor = Math.pow(10, 7);
        const usdPrice = Math.floor(tokenPriceInUSD * factor) / factor;

        const item = {
          ...token,
          market_cap: marketCapValue,
          token_price_in_usd: usdPrice,
          token_price_in_eth: Number(tokenPriceInEth),
        };

        tokensRespose.push(item);
      }
      console.log(tokensRespose);
      dispatch(setMeta(meta));
      if (meta.skip === 0) {
        dispatch(setTokens(tokensRespose));
      } else {
        dispatch(setExtraTokens(tokensRespose));
      }
      return callback?.onSuccess?.(tokensRespose);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getToken = async (id: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const token = await api.fetchToken(id);

      dispatch(setToken(token));
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

  const buyTokens = async (tokenAddress: Address, amount: number) => {
    try {
      console.log('calling this');
      dispatch(setLoadingBuy(true));

      //   return buyToken('0x5F66dE9e53D558439F25d4Ff9Ca606CFcE3B32f6', amount * 10 ** 18);
      return buyToken(tokenAddress, amount * 10 ** 18);
    } catch (error: any) {
      dispatch(setLoadingBuy(false));
      //
    }
  };

  const sellTokens = async (tokenAddress: Address, amount: number) => {
    try {
      console.log('calling this');
      dispatch(setLoadingBuy(true));

      return buyToken(tokenAddress, amount * 10 ** 18);
    } catch (error: any) {
      //
    }
  };

  const calculateTokenAmount = async (exchangeAddress: Address, amount: number) => {
    try {
      console.log(amount, amount * 10 ** 18);

      const result = await readContract(wagmiConfig, {
        abi: LaunchBoxExchange.abi,
        address: exchangeAddress,
        functionName: 'calculateSaleTokenOut',
        args: [amount * 10 ** 18],
      });
      console.log(result);

      return result;
    } catch (error: any) {
      console.log(error);
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
        console.log(deployData?.socials);
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
      console.log('errorrr oooo', e);
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

  //   console.log(buyError?.message);
  useEffect(() => {
    _submitData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeployPending, isDeployConfirmed, tokenState.loadingCreate]);

  useEffect(() => {
    if (!isBuyConfirmed || isBuyPending || buyError?.message) return;

    dispatch(setLoadingBuy(false));
    getBuyTransactionData()?.then((res) => console.log(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBuyPending, isBuyConfirmed, buyError]);

  return {
    getTokens,
    getToken,
    createToken,
    buyTokens,
    calculateTokenAmount,
  };
};

export default useTokenActions;
