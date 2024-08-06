import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import ConfigReducer from './config/config.slice';
import AuthReducer from './auth/auth.slice';
import UserReducer from './user/user.slice';
import UiReducer from './ui/ui.slice';
import FoodFolioCategoryReducer from './foodfolio/category/category.slice';
import FoodFolioBrandReducer from './foodfolio/brand/brand.slice';
import FoodFolioLocationReducer from './foodfolio/location/location.slice';

import { authApi } from './auth/auth.api';
import { userApi } from './user/user.api';
import { categoryApi } from './foodfolio/category/category.api';
import { brandApi } from './foodfolio/brand/brand.api';
import { locationApi } from './foodfolio/location/location.api';

const azkabanReducer = combineReducers({
	auth: AuthReducer,
	user: UserReducer,
});

const foodfolioReducer = combineReducers({
	category: FoodFolioCategoryReducer,
	brand: FoodFolioBrandReducer,
	location: FoodFolioLocationReducer,
});

export const store = configureStore({
	reducer: {
		config: ConfigReducer,
		ui: UiReducer,
		azkaban: azkabanReducer,
		foodfolio: foodfolioReducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[categoryApi.reducerPath]: categoryApi.reducer,
		[brandApi.reducerPath]: brandApi.reducer,
		[locationApi.reducerPath]: locationApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(userApi.middleware)
			.concat(categoryApi.middleware)
			.concat(brandApi.middleware)
			.concat(locationApi.middleware),
	devTools: true,
	enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
