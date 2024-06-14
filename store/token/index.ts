'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Token } from './types';

export interface TokenState {
  tokens: Token[] | undefined;
  token: Token | undefined;
  loading: boolean;
  loadingCreate: boolean;
}

const initialState: TokenState = {
  tokens: undefined,
  token: undefined,
  loading: false,
  loadingCreate: false,
};

export const tokenReducer = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setLoadingCreate: (state, action: PayloadAction<boolean>) => {
      state.loadingCreate = action.payload;
    },

    setTokens: (state, action: PayloadAction<Token[] | undefined>) => {
      if (action.payload) {
        state.tokens = [...action.payload];
      } else {
        state.tokens = undefined;
      }
    },

    setToken: (state, action: PayloadAction<Token | undefined>) => {
      if (action.payload) {
        state.token = { ...action.payload };
      } else {
        state.token = undefined;
      }
    },
  },
});

export const { setLoading, setTokens, setToken, setLoadingCreate } = tokenReducer.actions;

export default tokenReducer.reducer;
