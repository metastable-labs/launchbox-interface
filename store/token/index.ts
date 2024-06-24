'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CoinPrice, Meta, Token } from './types';

export interface TokenState {
  tokens: Token[] | undefined;
  token: Token | undefined;
  meta?: Meta;
  coinPrice?: CoinPrice;
  loading: boolean;
  loadingCreate: boolean;
  loadingBuy: boolean;
}

const initialState: TokenState = {
  tokens: undefined,
  token: undefined,
  meta: undefined,
  loading: true,
  loadingCreate: false,
  loadingBuy: false,
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

    setLoadingBuy: (state, action: PayloadAction<boolean>) => {
      state.loadingBuy = action.payload;
    },

    setExtraTokens: (state, action: PayloadAction<Token[] | undefined>) => {
      if (action.payload) {
        state.tokens = [...state.tokens!, ...action.payload];
      } else {
        state.tokens = undefined;
      }
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

    setMeta: (state, action: PayloadAction<Meta | undefined>) => {
      if (action.payload) {
        state.meta = { ...action.payload };
      } else {
        state.meta = undefined;
      }
    },

    setCoinPrice: (state, action: PayloadAction<CoinPrice | undefined>) => {
      if (action.payload) {
        state.coinPrice = { ...action.payload };
      } else {
        state.coinPrice = undefined;
      }
    },
  },
});

export const { setLoading, setTokens, setToken, setLoadingCreate, setMeta, setExtraTokens, setLoadingBuy, setCoinPrice } = tokenReducer.actions;

export default tokenReducer.reducer;
