'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AllLeaderboard, AllLeaderboardMeta, GetRankPosition, GetSystemIncentiveChannels, GetTokenIncentives } from './types';

export interface IncentiveState {
  systemIncentiveChannels?: GetSystemIncentiveChannels[];
  tokenIncentives?: GetTokenIncentives;
  incentiveChannelsLoading: boolean;
  activateIncentiveLoading: boolean;
  deleteIncentiveLoading: boolean;
  tokenIncentivesLoading: boolean;
  allLeaderboard?: AllLeaderboard;
  allLeaderboardMeta: AllLeaderboardMeta;
  allLeaderboardLoading: boolean;
  rankPosition?: GetRankPosition;
  rankPositionLoading: boolean;
}

const initialState: IncentiveState = {
  systemIncentiveChannels: undefined,
  incentiveChannelsLoading: true,
  activateIncentiveLoading: false,
  deleteIncentiveLoading: false,
  tokenIncentivesLoading: false,
  allLeaderboard: undefined,
  allLeaderboardMeta: {
    limit: 20,
    page: 1,
  },
  allLeaderboardLoading: true,
  rankPosition: undefined,
  rankPositionLoading: false,
};

export const incentiveReducer = createSlice({
  name: 'incentive',
  initialState,
  reducers: {
    setIncentiveChannels: (state, action: PayloadAction<GetSystemIncentiveChannels[] | undefined>) => {
      if (action.payload) {
        state.systemIncentiveChannels = [...action.payload];
      } else {
        state.systemIncentiveChannels = undefined;
      }
    },

    setTokenIncentives: (state, action: PayloadAction<GetTokenIncentives | undefined>) => {
      if (action.payload) {
        state.tokenIncentives = { ...action.payload };
      } else {
        state.tokenIncentives = undefined;
      }
    },

    setIncentiveChannelsLoading: (state, action: PayloadAction<boolean>) => {
      state.incentiveChannelsLoading = action.payload;
    },

    setActivateIncentiveLoading: (state, action: PayloadAction<boolean>) => {
      state.activateIncentiveLoading = action.payload;
    },

    setDeleteIncentiveLoading: (state, action: PayloadAction<boolean>) => {
      state.deleteIncentiveLoading = action.payload;
    },

    setTokenIncentivesLoading: (state, action: PayloadAction<boolean>) => {
      state.tokenIncentivesLoading = action.payload;
    },

    setAllLeaderboard: (state, action: PayloadAction<AllLeaderboard | undefined>) => {
      if (action.payload) {
        state.allLeaderboard = { ...action.payload };
      } else {
        state.allLeaderboard = undefined;
      }
    },

    setExtraAllLeaderboard: (state, action: PayloadAction<AllLeaderboard | undefined>) => {
      if (action.payload) {
        const currentRanking = state.allLeaderboard?.ranking || [];
        state.allLeaderboard = {
          ...action.payload,
          ranking: [...currentRanking, ...action.payload.ranking],
        };
      } else {
        state.allLeaderboard = undefined;
      }
    },

    setAllLeaderboardMeta: (state, action: PayloadAction<AllLeaderboardMeta>) => {
      if (action.payload) {
        state.allLeaderboardMeta = { ...state.allLeaderboardMeta, ...action.payload };
      }
    },

    setAllLeaderboardLoading: (state, action: PayloadAction<boolean>) => {
      state.allLeaderboardLoading = action.payload;
    },

    setRankPosition: (state, action: PayloadAction<GetRankPosition | undefined>) => {
      if (action.payload) {
        state.rankPosition = { ...action.payload };
      } else {
        state.rankPosition = undefined;
      }
    },

    setRankPositionLoading: (state, action: PayloadAction<boolean>) => {
      state.rankPositionLoading = action.payload;
    },
  },
});

export const {
  setActivateIncentiveLoading,
  setDeleteIncentiveLoading,
  setIncentiveChannels,
  setIncentiveChannelsLoading,
  setTokenIncentivesLoading,
  setTokenIncentives,
  setAllLeaderboard,
  setExtraAllLeaderboard,
  setAllLeaderboardLoading,
  setAllLeaderboardMeta,
  setRankPosition,
  setRankPositionLoading,
} = incentiveReducer.actions;

export default incentiveReducer.reducer;
