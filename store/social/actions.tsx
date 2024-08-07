'use client';
import { useAccount } from 'wagmi';
import { usePrivy } from '@privy-io/react-auth';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setLoading, setFarcaster } from '.';
import { CallbackProps } from '..';

const useSocialActions = () => {
  const { dispatch } = useSystemFunctions();
  const { address } = useAccount();
  const { authenticated } = usePrivy();

  const getFarcasterChannels = async (callback?: CallbackProps) => {
    try {
      if (!address || !authenticated) return;
      dispatch(setLoading(true));

      const channels = await api.fetchFarcasterChannels(address);

      dispatch(setFarcaster(channels));

      return callback?.onSuccess?.(channels);
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    getFarcasterChannels,
  };
};

export default useSocialActions;
