'use client';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setActivateIncentiveLoading, setDeleteIncentiveLoading, setIncentiveChannels, setIncentiveChannelsLoading } from '.';
import { CallbackProps } from '..';

const useIncentiveActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();

  const getIncentiveChannels = async (callback?: CallbackProps) => {
    try {
      dispatch(setIncentiveChannelsLoading(true));

      const data = await api.fetchSystemIncentiveChannels();

      dispatch(setIncentiveChannels(data));

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setIncentiveChannelsLoading(false));
    }
  };

  const activateIncentive = async (data: ActivateIncentiveProps, callback?: CallbackProps) => {
    try {
      if (!tokenState.token?.id) return;
      dispatch(setActivateIncentiveLoading(true));

      await api.activateIncentive(tokenState.token?.id, data);

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setActivateIncentiveLoading(false));
    }
  };

  const deleteIncentive = async (data: DeleteIncentiveProps, callback?: CallbackProps) => {
    try {
      if (!tokenState.token?.id) return;
      dispatch(setDeleteIncentiveLoading(true));

      await api.deleteIncentive(tokenState.token?.id, data);

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setDeleteIncentiveLoading(false));
    }
  };

  return {
    getIncentiveChannels,
    activateIncentive,
    deleteIncentive,
  };
};

export default useIncentiveActions;
