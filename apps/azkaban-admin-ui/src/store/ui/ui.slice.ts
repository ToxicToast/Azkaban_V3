import { createSlice } from '@reduxjs/toolkit/react';
import { uiState } from './ui.state';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UiModel } from './ui.model';
import {
  userLoginPending,
  userLoginFullfilled,
  userLoginRejected,
} from './ui.extraReducer';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: uiState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UiModel>) => {
    userLoginPending(builder);
    userLoginFullfilled(builder);
    userLoginRejected(builder);
  },
});

export default uiSlice.reducer;
