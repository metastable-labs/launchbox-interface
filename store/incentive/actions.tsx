'use client';

import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import api from './api';
import {
  setActivateIncentiveLoading,
  setDeleteIncentiveLoading,
  setIncentiveChannels,
  setIncentiveChannelsLoading,
  setTokenIncentives,
  setTokenIncentivesLoading,
  setAllLeaderboard,
  setAllLeaderboardLoading,
  setRankPosition,
  setRankPositionLoading,
  setAllLeaderboardMeta,
} from '.';
import { CallbackProps } from '..';
import { ActivateIncentiveProps, DeleteIncentiveProps } from './types';

const useIncentiveActions = () => {
  const {
    dispatch,
    tokenState,
    incentiveState: { allLeaderboardMeta },
  } = useSystemFunctions();
  const { address } = useAccount();

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
      toast(error?.response?.data?.message || 'Failed to activate', {
        type: 'error',
      });
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

  const getAllLeaderboard = async (query: string, callback?: CallbackProps) => {
    try {
      if (!tokenState.token?.id) return;
      dispatch(setAllLeaderboardLoading(true));

      const data = await api.fetchAllLeaderboard(tokenState.token?.id, query);

      dispatch(setAllLeaderboardMeta({ total: data.total }));

      if (allLeaderboardMeta?.page === 1) {
        dispatch(setAllLeaderboard(data));
      } else {
        dispatch(setAllLeaderboard(data));
      }

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setAllLeaderboardLoading(false));
    }
  };

  const getRankPosition = async (callback?: CallbackProps) => {
    try {
      if (!tokenState.token?.id || !address) return;
      dispatch(setRankPositionLoading(true));

      const data = await api.fetchRankPostion(tokenState.token?.id, address);

      dispatch(setRankPosition(data));

      callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setRankPositionLoading(false));
    }
  };

  return {
    getSystemIncentiveChannels,
    activateIncentive,
    deleteIncentive,
    getTokenIncentives,
    getAllLeaderboard,
    getRankPosition,
  };
};

export default useIncentiveActions;
