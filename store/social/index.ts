'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FarcaterChannel } from './types';

export interface SocialState {
  farcasterChannels: FarcaterChannel[] | undefined;
  loading: boolean;
}

const initialState: SocialState = {
  farcasterChannels: undefined,
  loading: true,
};

export const socialReducer = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setFarcaster: (state, action: PayloadAction<FarcaterChannel[] | undefined>) => {
      if (action.payload === undefined) {
        state.farcasterChannels = undefined;
      } else {
        state.farcasterChannels = [...action.payload];
      }
    },
  },
});

export const { setLoading, setFarcaster } = socialReducer.actions;

export default socialReducer.reducer;
