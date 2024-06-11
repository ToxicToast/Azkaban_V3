import { createSlice } from '@reduxjs/toolkit/react';
import { userState } from './user.state';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserModel } from './user.model';

export const userSlice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserModel>) => {},
});
export default userSlice.reducer;
