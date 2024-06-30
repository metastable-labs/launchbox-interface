'use client';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setCasts, setLoading, setMeta } from '.';
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

      // if (meta.skip === 0) {
      // } else {
      //   dispatch(setExtraCasts(data));
      // }

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
