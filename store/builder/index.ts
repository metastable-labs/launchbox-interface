'use client';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BuilderState {
  updateLoading: boolean;
}

const initialState: BuilderState = {
  updateLoading: false,
};

export const builderReducer = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setUpdateLoading: (state, action: PayloadAction<boolean>) => {
      state.updateLoading = action.payload;
    },
  },
});

export const { setUpdateLoading } = builderReducer.actions;

export default builderReducer.reducer;
