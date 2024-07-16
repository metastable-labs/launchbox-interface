'use client';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import { setActivateIncentiveLoading, setDeleteIncentiveLoading, setIncentiveChannels, setIncentiveChannelsLoading, setTokenIncentives, setTokenIncentivesLoading } from '.';
import { CallbackProps } from '..';

const useIncentiveActions = () => {
  const { dispatch, tokenState } = useSystemFunctions();

  const getSystemIncentiveChannels = async (callback?: CallbackProps) => {
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

  const getTokenIncentives = async (callback?: CallbackProps) => {
    try {
      if (!tokenState.token) return;

      dispatch(setTokenIncentivesLoading(true));

      const data = await api.fetchTokenIncentives(tokenState.token.id);

      dispatch(setTokenIncentives(data));

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setTokenIncentivesLoading(false));
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
    getSystemIncentiveChannels,
    activateIncentive,
    deleteIncentive,
    getTokenIncentives,
  };
};

export default useIncentiveActions;
