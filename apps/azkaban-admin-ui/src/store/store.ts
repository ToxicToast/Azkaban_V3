import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import ConfigReducer from './config/config.slice';
import AuthReducer from './auth/auth.slice';
import UserReducer from './user/user.slice';
import UiReducer from './ui/ui.slice';

import { authApi } from './auth/auth.api';

export const store = configureStore({
  reducer: {
    config: ConfigReducer,
    auth: AuthReducer,
    user: UserReducer,
    ui: UiReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  devTools: true,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
