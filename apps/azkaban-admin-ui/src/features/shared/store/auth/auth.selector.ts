import { RootState } from '../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { UserGroups } from '../../enums';

const selectAuth = (state: RootState) => state.azkaban.auth;

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

export const selectAuthAdminGroup = createDraftSafeSelector(
	selectAuthGroups,
	(groups) => groups.includes(UserGroups.ADMIN),
);

export const selectAuthFoodfolioGroup = createDraftSafeSelector(
	selectAuthGroups,
	(groups) => groups.includes(UserGroups.FOODFOLIOADMIN),
);

export const selectAuthTwitchGroup = createDraftSafeSelector(
	selectAuthGroups,
	(groups) => groups.includes(UserGroups.TWITCHADMIN),
);

export const selectAuthCoWorkingGroup = createDraftSafeSelector(
	selectAuthGroups,
	(groups) => groups.includes(UserGroups.COWORKINGADMIN),
);
