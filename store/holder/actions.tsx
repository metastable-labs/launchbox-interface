'use client';
import { useAccount } from 'wagmi';

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

      if (meta.skip === 0) {
        dispatch(setHolders(data));
      } else {
        dispatch(setExtraHolders(data));
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
