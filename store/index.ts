'use client';
import { configureStore } from '@reduxjs/toolkit';

import tokenReducer from './token';
import socialReducer from './social';
import transactionReducer from './transaction';
import holderReducer from './holder';

export interface CallbackProps {
  onSuccess?: Function;
  onError?: Function;
}

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    social: socialReducer,
    transaction: transactionReducer,
    holder: holderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;
