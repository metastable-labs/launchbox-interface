'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IncentiveState {
  incentiveChannels?: GetSystemIncentiveChannels[];
  incentiveChannelsLoading: boolean;
  activateIncentiveLoading: boolean;
  deleteIncentiveLoading: boolean;
}

const initialState: IncentiveState = {
  incentiveChannels: undefined,
  incentiveChannelsLoading: true,
  activateIncentiveLoading: false,
  deleteIncentiveLoading: false,
};

export const incentiveReducer = createSlice({
  name: 'incentive',
  initialState,
  reducers: {
    setIncentiveChannels: (state, action: PayloadAction<GetSystemIncentiveChannels[] | undefined>) => {
      if (action.payload) {
        state.incentiveChannels = [...action.payload];
      } else {
        state.incentiveChannels = undefined;
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
  },
});

export const { setActivateIncentiveLoading, setDeleteIncentiveLoading, setIncentiveChannels, setIncentiveChannelsLoading } = incentiveReducer.actions;

export default incentiveReducer.reducer;
