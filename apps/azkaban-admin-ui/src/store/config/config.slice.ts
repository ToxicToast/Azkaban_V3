import { createSlice } from '@reduxjs/toolkit/react';
import { configState } from './config.state';

export const configSlice = createSlice({
  name: 'config',
  initialState: configState,
  reducers: {},
});

export default configSlice.reducer;
