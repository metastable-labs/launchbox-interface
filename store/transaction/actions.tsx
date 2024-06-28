'use client';
import { useAccount } from 'wagmi';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setExtraTransactions, setLoading, setMeta, setTransactions } from '.';
import { CallbackProps } from '..';

const useTransactionActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();
  const { address } = useAccount();

  const getTokenTransactions = async (query: string, callback?: CallbackProps) => {
    try {
      if (!address || !tokenState.token?.id) return;
      dispatch(setLoading(true));

      const { meta, data } = await api.fetchTokenTransactions(tokenState.token?.id, query);
      dispatch(setMeta(meta));

      const transactions = [];
      for (const activity of data) {
        const tokenPriceInUSD = 3000 * Number(activity.eth_value);

        const factor = Math.pow(10, 6);
        const usdPrice = Math.floor(tokenPriceInUSD * factor) / factor;

        const item = {
          ...activity,
          token_value_in_usd: usdPrice,
        };

        transactions.push(item);
      }

      if (meta.skip === 0) {
        dispatch(setTransactions(transactions));
      } else {
        dispatch(setExtraTransactions(transactions));
      }

      callback?.onSuccess?.();
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
