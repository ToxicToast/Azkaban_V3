import { AuthModel } from './auth.model';
import { PayloadAction } from '@reduxjs/toolkit';
import { Auth } from '@toxictoast/azkaban-sdk';

export function setUserAction(state: AuthModel, action: PayloadAction<Auth>) {
  const payload = action.payload;
  const { user, token, exp } = payload;
  //
  state.id = user.id;
  state.username = user.username;
  state.groups = user.groups;
  state.token = token;
  state.isAuthenticated = token !== null;
  state.isActive = user.isActive;
  state.isBanned = user.isBanned;
  state.activation_token = user.activation_token;
  state.expireTime = exp;
}
