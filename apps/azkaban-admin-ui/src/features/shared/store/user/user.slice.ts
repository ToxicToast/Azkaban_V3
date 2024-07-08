import { createSlice } from '@reduxjs/toolkit/react';
import { userState } from './user.state';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserModel } from './user.model';
import { fetchUsersFullfilled, fetchUsersRejected } from './user.extraReducer';

export const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<UserModel>) => {
        fetchUsersFullfilled(builder);
        fetchUsersRejected(builder);
    },
});
export default userSlice.reducer;
