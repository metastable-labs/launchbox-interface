'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from './types';

export interface TransactionState {
  transactions: Transaction[] | undefined;
  loading: boolean;
}

const initialState: TransactionState = {
  transactions: undefined,
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
  },
});

export const { setLoading, setTransactions } = transactionReducer.actions;

export default transactionReducer.reducer;
