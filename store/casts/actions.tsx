'use client';
import { useAccount } from 'wagmi';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setCasts, setExtraCasts, setLoading, setMeta } from '.';
import { CallbackProps } from '..';

const useCastActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();
  const { address } = useAccount();

  const getChannelCasts = async (query: string, callback?: CallbackProps) => {
    try {
      const channelID = tokenState?.token?.socials?.warpcast?.channel?.channel_id;

      if (!address || !channelID) return;

      dispatch(setLoading(true));

      const { meta, data } = await api.fetchChannelCasts(channelID, query);
      dispatch(setMeta(meta));

      if (meta.skip === 0) {
        dispatch(setCasts(data));
      } else {
        dispatch(setExtraCasts(data));
      }

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    getChannelCasts,
  };
};

export default useCastActions;
