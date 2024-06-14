'use client';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { useChainId, useAccount } from 'wagmi';
import { mode } from 'wagmi/chains';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import useContract from '@/hooks/useContract';
import { setLoading, setLoadingCreate, setToken, setTokens } from '.';
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

  const getTokens = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const tokens = await api.fetchTokens();

      dispatch(setTokens(tokens));
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

      deployToken(data.token_name, data.token_symbol, data.token_decimals, data.token_total_supply);
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

      const txData = await getTransactionData();

      const formData = new FormData();
      formData.append('logo', deployData?.logo as File);
      formData.append('token_name', deployData?.token_name!);
      formData.append('token_symbol', deployData?.token_symbol!);
      formData.append('token_decimals', deployData?.token_decimals!);
      formData.append('token_address', deployData?.token_address!);
      formData.append('token_total_supply', deployData?.token_total_supply! as unknown as string);
      formData.append('create_token_page', deployData?.create_token_page! as any);

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

      getTokens();
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
    getToken,
    createToken,
  };
};

export default useTokenActions;
