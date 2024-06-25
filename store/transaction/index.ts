'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionMeta } from './types';

export interface TransactionState {
  transactions?: Transaction[];
  meta?: TransactionMeta;
  loading: boolean;
}

const initialState: TransactionState = {
  transactions: undefined,
  meta: undefined,
  loading: true,
};

export const transactionReducer = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setTransactions: (state, action: PayloadAction<Transaction[] | undefined>) => {
      if (action.payload === undefined) {
        state.transactions = undefined;
      } else {
        state.transactions = [...action.payload];
      }
    },

    setMeta: (state, action: PayloadAction<TransactionMeta | undefined>) => {
      if (action.payload === undefined) {
        state.meta = undefined;
      } else {
        state.meta = { ...action.payload };
      }
    },
  },
});

export const { setLoading, setTransactions, setMeta } = transactionReducer.actions;

export default transactionReducer.reducer;
