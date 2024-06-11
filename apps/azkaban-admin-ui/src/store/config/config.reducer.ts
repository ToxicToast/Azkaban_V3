import { ConfigModel } from './config.model';
import { PayloadAction } from '@reduxjs/toolkit';

export function setBaseUrlAction(
  state: ConfigModel,
  action: PayloadAction<string>,
) {
  state.baseUrl = action.payload;
}
