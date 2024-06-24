'use client';
import { useAccount } from 'wagmi';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setLoading, setTransactions } from '.';
import { CallbackProps } from '..';

const useTransactionActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();
  const { address } = useAccount();

  const getTokenTransactions = async (callback?: CallbackProps) => {
    try {
      if (!address || !tokenState.token?.id) return;
      dispatch(setLoading(true));

      const activities = await api.fetchTokenTransactions(tokenState.token?.id);

      console.log(activities);
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    getTokenTransactions,
  };
};

export default useTransactionActions;
