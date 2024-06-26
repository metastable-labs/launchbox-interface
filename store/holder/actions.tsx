'use client';
import { useAccount } from 'wagmi';
import { formatEther } from 'viem';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setExtraHolders, setHolders, setLoading, setMeta } from '.';
import { CallbackProps } from '..';

const useHolderActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();
  const { address } = useAccount();

  const getTokenHolders = async (query: string, callback?: CallbackProps) => {
    try {
      if (!address || !tokenState.token?.id) return;
      dispatch(setLoading(true));

      const { meta, data } = await api.fetchTokenHolders(tokenState.token?.id, query);
      dispatch(setMeta(meta));

      const holders = [];

      for (const activity of data) {
        const balance = formatEther(BigInt(activity.balance));

        const item = {
          ...activity,
          balance,
        };

        holders.push(item);
      }

      if (meta.skip === 0) {
        dispatch(setHolders(holders));
      } else {
        dispatch(setExtraHolders(holders));
      }

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    getTokenHolders,
  };
};

export default useHolderActions;