import { RootState } from '../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

const selectAuth = (state: RootState) => state.auth;

export const selectAuthId = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.id,
);

export const selectAuthUsername = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.username,
);
export const selectAuthGroups = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.groups,
);
export const selectAuthToken = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.token,
);

export const selectAuthIsAuthenticated = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.isAuthenticated,
);

export const selectAuthIsActive = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.isActive,
);

export const selectAuthIsBanned = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.isBanned,
);

export const selectAuthActivationToken = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.activation_token,
);

export const selectAuthExpireTime = createDraftSafeSelector(
  selectAuth,
  (auth) => auth.expireTime,
);
