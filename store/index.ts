'use client';
import { configureStore } from '@reduxjs/toolkit';

import tokenReducer from './token';
import socialReducer from './social';
import transactionReducer from './transaction';
import holderReducer from './holder';
import castReducer from './casts';
import builderReducer from './builder';
import incentiveReducer from './incentive';

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
    cast: castReducer,
    builder: builderReducer,
    incentive: incentiveReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {user: UserState}
export type AppDispatch = typeof store.dispatch;
