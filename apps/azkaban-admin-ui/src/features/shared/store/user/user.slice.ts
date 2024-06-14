import { createSlice } from '@reduxjs/toolkit/react';
import { userState } from './user.state';

export const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {},
});
export default userSlice.reducer;
