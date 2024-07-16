'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IncentiveState {
  systemIncentiveChannels?: GetSystemIncentiveChannels[];
  tokenIncentives?: GetTokenIncentives;
  incentiveChannelsLoading: boolean;
  activateIncentiveLoading: boolean;
  deleteIncentiveLoading: boolean;
  tokenIncentivesLoading: boolean;
}

const initialState: IncentiveState = {
  systemIncentiveChannels: undefined,
  incentiveChannelsLoading: true,
  activateIncentiveLoading: false,
  deleteIncentiveLoading: false,
  tokenIncentivesLoading: false,
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
  },
});

export const { setActivateIncentiveLoading, setDeleteIncentiveLoading, setIncentiveChannels, setIncentiveChannelsLoading, setTokenIncentivesLoading, setTokenIncentives } = incentiveReducer.actions;

export default incentiveReducer.reducer;
