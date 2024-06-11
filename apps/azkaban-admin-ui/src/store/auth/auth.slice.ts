import { createSlice } from '@reduxjs/toolkit/react';
import { authState } from './auth.state';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AuthModel } from './auth.model';
import { userLoginFullfilled } from './auth.extraReducer';
import { setUserAction } from './auth.reducer';

export const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        setUser: setUserAction,
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthModel>) => {
        userLoginFullfilled(builder);
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
