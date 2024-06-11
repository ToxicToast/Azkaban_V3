import { AuthModel } from './auth.model';

export const authState: AuthModel = {
  id: null,
  username: null,
  groups: [],
  token: null,
  isAuthenticated: false,
  isActive: null,
  isBanned: null,
  activation_token: null,
  expireTime: null,
};
