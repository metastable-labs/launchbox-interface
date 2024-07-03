'use client';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setCasts, setLoading, setMeta, setCastAnalytics, setLoadingCastAnalytics } from '.';
import { CallbackProps } from '..';

const useCastActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();

  const getChannelCasts = async (query: string, callback?: CallbackProps) => {
    try {
      if (!tokenState.token?.id) return;

      dispatch(setLoading(true));

      const { meta, data } = await api.fetchChannelCasts(tokenState.token?.id, query);

      dispatch(setMeta(meta));

      dispatch(setCasts(data));

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getChannelCastAnalytics = async (query: string, callback?: CallbackProps) => {
    try {
      if (!tokenState.token?.id) return;

      dispatch(setLoadingCastAnalytics(true));

      const data = await api.fetchChannelCastAnalytics(tokenState.token?.id, query);

      dispatch(setCastAnalytics(data));

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingCastAnalytics(false));
    }
  };

  return {
    getChannelCasts,
    getChannelCastAnalytics,
  };
};

export default useCastActions;
