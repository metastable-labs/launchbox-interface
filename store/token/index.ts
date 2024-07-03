'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Analytics, CoinPrice, Meta, Token } from './types';

export interface TokenState {
  tokens: Token[] | undefined;
  userTokens: Token[] | undefined;
  token: Token | undefined;
  meta?: Meta;
  loading: boolean;
  userTokensLoading: boolean;
  loadingCreate: boolean;
  loadingBuy: boolean;
  loadingAnalytics: boolean;
  userTokensMeta?: Meta;
  coinPrice?: CoinPrice;
  analytics?: Analytics;
  oneHourAnalytics?: Analytics;
  oneDayAnalytics?: Analytics;
  oneWeekAnalytics?: Analytics;
  oneMonthAnalytics?: Analytics;
}

const initialState: TokenState = {
  tokens: undefined,
  userTokens: undefined,
  token: undefined,
  meta: undefined,
  loading: true,
  userTokensLoading: true,
  loadingCreate: false,
  loadingBuy: false,
  userTokensMeta: undefined,
  coinPrice: undefined,
  analytics: undefined,
  oneHourAnalytics: undefined,
  oneDayAnalytics: undefined,
  oneWeekAnalytics: undefined,
  oneMonthAnalytics: undefined,
  loadingAnalytics: true,
};

export const tokenReducer = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setUserTokensLoading: (state, action: PayloadAction<boolean>) => {
      state.userTokensLoading = action.payload;
    },

    setLoadingCreate: (state, action: PayloadAction<boolean>) => {
      state.loadingCreate = action.payload;
    },

    setLoadingBuy: (state, action: PayloadAction<boolean>) => {
      state.loadingBuy = action.payload;
    },

    setLoadingAnalytics: (state, action: PayloadAction<boolean>) => {
      state.loadingAnalytics = action.payload;
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

    setExtraUserTokens: (state, action: PayloadAction<Token[] | undefined>) => {
      if (action.payload) {
        state.userTokens = [...state.userTokens!, ...action.payload];
      } else {
        state.userTokens = undefined;
      }
    },

    setUserTokens: (state, action: PayloadAction<Token[] | undefined>) => {
      if (action.payload) {
        state.userTokens = [...action.payload];
      } else {
        state.userTokens = undefined;
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

    setUserTokensMeta: (state, action: PayloadAction<Meta | undefined>) => {
      if (action.payload) {
        state.userTokensMeta = { ...action.payload };
      } else {
        state.userTokensMeta = undefined;
      }
    },

    setCoinPrice: (state, action: PayloadAction<CoinPrice>) => {
      state.coinPrice = { ...action.payload };
    },

    setAnalytics: (state, action: PayloadAction<Analytics | undefined>) => {
      if (action.payload) {
        state.analytics = { ...action.payload };
      } else {
        state.analytics = undefined;
      }
    },

    setOneHourAnalytics: (state, action: PayloadAction<Analytics | undefined>) => {
      if (action.payload) {
        state.oneHourAnalytics = { ...action.payload };
      } else {
        state.oneHourAnalytics = undefined;
      }
    },

    setOneDayAnalytics: (state, action: PayloadAction<Analytics | undefined>) => {
      if (action.payload) {
        state.oneDayAnalytics = { ...action.payload };
      } else {
        state.oneDayAnalytics = undefined;
      }
    },

    setOneWeekAnalytics: (state, action: PayloadAction<Analytics | undefined>) => {
      if (action.payload) {
        state.oneWeekAnalytics = { ...action.payload };
      } else {
        state.oneWeekAnalytics = undefined;
      }
    },

    setOneMonthAnalytics: (state, action: PayloadAction<Analytics | undefined>) => {
      if (action.payload) {
        state.oneMonthAnalytics = { ...action.payload };
      } else {
        state.oneMonthAnalytics = undefined;
      }
    },
  },
});

export const {
  setAnalytics,
  setCoinPrice,
  setExtraTokens,
  setExtraUserTokens,
  setLoading,
  setLoadingAnalytics,
  setLoadingBuy,
  setLoadingCreate,
  setMeta,
  setOneDayAnalytics,
  setOneHourAnalytics,
  setOneMonthAnalytics,
  setOneWeekAnalytics,
  setToken,
  setTokens,
  setUserTokens,
  setUserTokensLoading,
  setUserTokensMeta,
} = tokenReducer.actions;

export default tokenReducer.reducer;
