import { createSlice } from '@reduxjs/toolkit/react';
import { userState } from './user.state';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserModel } from './user.model';
import { fetchUsersFullfilled, fetchUsersRejected } from './user.extraReducer';
import { SetSelectedIdAction } from './user.reducer';

export const userSlice = createSlice({
	name: 'user',
	initialState: userState,
	reducers: {
		setSelectedId: SetSelectedIdAction,
	},
	extraReducers: (builder: ActionReducerMapBuilder<UserModel>) => {
		fetchUsersFullfilled(builder);
		fetchUsersRejected(builder);
	},
});
export default userSlice.reducer;
