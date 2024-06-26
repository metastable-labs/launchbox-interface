'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Holder, HolderMeta } from './types';

export interface HolderState {
  holders?: Holder[];
  meta?: HolderMeta;
  loading: boolean;
}

const initialState: HolderState = {
  holders: undefined,
  meta: undefined,
  loading: true,
};

export const holderReducer = createSlice({
  name: 'holder',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setHolders: (state, action: PayloadAction<Holder[] | undefined>) => {
      if (action.payload) {
        state.holders = [...action.payload];
      } else {
        state.holders = undefined;
      }
    },

    setExtraHolders: (state, action: PayloadAction<Holder[] | undefined>) => {
      if (action.payload) {
        state.holders = [...state.holders!, ...action.payload];
      } else {
        state.holders = undefined;
      }
    },

    setMeta: (state, action: PayloadAction<HolderMeta | undefined>) => {
      if (action.payload === undefined) {
        state.meta = undefined;
      } else {
        state.meta = { ...action.payload };
      }
    },
  },
});

export const { setExtraHolders, setHolders, setLoading, setMeta } = holderReducer.actions;

export default holderReducer.reducer;
