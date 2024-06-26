'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Cast, CastMeta } from './types';

export interface CastState {
  casts?: Cast[];
  meta?: CastMeta;
  loading: boolean;
}

const initialState: CastState = {
  casts: undefined,
  meta: undefined,
  loading: true,
};

export const castReducer = createSlice({
  name: 'cast',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setCasts: (state, action: PayloadAction<Cast[] | undefined>) => {
      if (action.payload) {
        state.casts = [...action.payload];
      } else {
        state.casts = undefined;
      }
    },

    setExtraCasts: (state, action: PayloadAction<Cast[] | undefined>) => {
      if (action.payload) {
        state.casts = [...state.casts!, ...action.payload];
      } else {
        state.casts = undefined;
      }
    },

    setMeta: (state, action: PayloadAction<CastMeta | undefined>) => {
      if (action.payload === undefined) {
        state.meta = undefined;
      } else {
        state.meta = { ...action.payload };
      }
    },
  },
});

export const { setCasts, setExtraCasts, setLoading, setMeta } = castReducer.actions;

export default castReducer.reducer;
