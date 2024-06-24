'use client';
import { useEffect, useState } from 'react';
import { Address, decodeEventLog } from 'viem';
import { useChainId, useAccount } from 'wagmi';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import useContract from '@/hooks/useContract';
import { setLoading, setLoadingCreate, setToken, setTokens, setMeta, setExtraTokens, setExtraUserTokens, setUserTokens, setUserTokensLoading, setUserTokensMeta } from '.';
import { CallbackProps } from '..';
import api from './api';
import { TokenData } from './types';
import { networks } from '@/config/rainbow/config';
import { trim } from 'viem';

const useTokenActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();
  const { deployToken, isPending, isConfirmed, getTransactionData, error } = useContract();
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

      return deployToken(data.token_name, data.token_symbol, '18', data.token_total_supply * 10 ** 18);
    } catch (error: any) {
      console.log(error);
      callback?.onError?.(error);
    } finally {
      //
    }
  };

  const _submitData = async () => {
    try {
      if (isPending || !isConfirmed) return;

      const currentNetwork = networks.find((network) => network.chainId === chainId);

      const txData = await getTransactionData();
      console.log('txData', txData);

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

  useEffect(() => {
    _submitData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, isConfirmed, error, tokenState.loadingCreate]);

  return {
    getTokens,
    getUserTokens,
    getToken,
    createToken,
  };
};

export default useTokenActions;
