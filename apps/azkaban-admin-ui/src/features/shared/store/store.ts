import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import ConfigReducer from './config/config.slice';
import AuthReducer from './auth/auth.slice';
import UserReducer from './user/user.slice';
import UiReducer from './ui/ui.slice';
import FoodFolioCategoryReducer from './foodfolio/category/category.slice';

import { authApi } from './auth/auth.api';
import { userApi } from './user/user.api';
import { categoryApi } from './foodfolio/category/category.api';

const foodfolioReducer = combineReducers({
	category: FoodFolioCategoryReducer,
});

const authReducer = combineReducers({
	auth: AuthReducer,
});

const userReducer = combineReducers({
	user: UserReducer,
});

export const store = configureStore({
	reducer: {
		config: ConfigReducer,
		ui: UiReducer,
		user: userReducer,
		auth: authReducer,
		foodfolio: foodfolioReducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(categoryApi.middleware),
	devTools: true,
	enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
