import { createSlice } from '@reduxjs/toolkit/react';
import { authState } from './auth.state';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthModel } from './auth.model';
import { userLoginFullfilled, userLoginRejected } from './auth.extraReducer';
import { setLogoutAction, setUserAction } from './auth.reducer';

export const authSlice = createSlice({
	name: 'auth',
	initialState: authState,
	reducers: {
		setUser: setUserAction,
		setLogout: setLogoutAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<AuthModel>) => {
		userLoginFullfilled(builder);
		userLoginRejected(builder);
	},
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
