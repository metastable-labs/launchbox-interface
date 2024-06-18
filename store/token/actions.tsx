'use client';
import { useEffect, useState } from 'react';
import { Address, decodeEventLog } from 'viem';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useChainId, useAccount } from 'wagmi';
import { mode } from 'wagmi/chains';
import { trim } from 'viem';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import useContract from '@/hooks/useContract';
import { networks } from '@/config/rainbow/config';
import { setLoading, setLoadingCreate, setToken, setTokens, setMeta, setExtraTokens, setLoadingBuy } from '.';
import { CallbackProps } from '..';
import api from './api';
import { TokenData } from './types';

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
      const { meta, tokens } = await api.fetchTokens(query);

      dispatch(setMeta(meta));
      if (meta.skip === 0) {
        dispatch(setTokens(tokens));
      } else {
        dispatch(setExtraTokens(tokens));
      }
      return callback?.onSuccess?.(tokens);
    } catch (error: any) {
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

      deployToken(data.token_name, data.token_symbol, '18', data.token_total_supply * 10 ** 18);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    }
  };

  const buyTokens = async (tokenAddress: Address, amount: number) => {
    try {
      console.log('calling this');
      dispatch(setLoadingBuy(true));

      return buyToken('0x5F66dE9e53D558439F25d4Ff9Ca606CFcE3B32f6', amount * 10 ** 18);
    } catch (error: any) {
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

  const _submitData = async () => {
    try {
      if (isDeployPending || !isDeployConfirmed) return;

      const currentNetwork = networks.find((network) => network.chainId === chainId);

      const txData = await getDeployTransactionData();
      console.log('txData', txData);

      const topicIndex = chainId !== 34443 ? 1 : 2;

      const topics = txData?.logs?.[4]?.topics;
      const data = txData?.logs?.[4]?.data;
      const decodedEvent: any = await decodeEventLog({ abi: currentNetwork?.factoryAbi!, topics: topics!, data: data });

      const tokenAddress = decodedEvent?.args?.tokenAddress;
      const exchangeAddress = decodedEvent?.args?.launchboxExchangeAddress;

      const formData = new FormData();
      formData.append('logo', deployData?.logo as File);
      formData.append('token_name', deployData?.token_name!);
      formData.append('token_symbol', deployData?.token_symbol!);
      formData.append('token_address', trim(tokenAddress as Address));
      formData.append('token_total_supply', deployData?.token_total_supply! as unknown as string);
      formData.append('create_token_page', deployData?.create_token_page! as any);
      formData.append('token_decimals', '18');

      if (deployData?.warpcast_channel_link) {
        formData.append('warpcast_channel_link', deployData?.warpcast_channel_link!);
      }

      if (deployData?.website_url) {
        formData.append('website_url', deployData?.website_url!);
      }

      const deployedToken = networks.find((network) => network.chainId === chainId);

      let chain = {
        id: chainId,
        name: deployedToken?.variant,
        deployer_address: address,
        transaction_hash: txData?.transactionHash,
      };

      formData.append('chain', JSON.stringify(chain));

      const response = await api.createToken(formData);

      dispatch(setToken(response));

      getTokens('take=50');
    } finally {
      dispatch(setLoadingCreate(false));
    }
  };
  console.log(buyError?.message);
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
  };
};

export default useTokenActions;
