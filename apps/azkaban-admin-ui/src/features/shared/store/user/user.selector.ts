import { RootState } from '../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

const selectUser = (state: RootState) => state.user.user;

export const selectUserData = createDraftSafeSelector(
	selectUser,
	(user) => user.data,
);

export const selectUserDataCount = createDraftSafeSelector(
	selectUser,
	(user) => user.data.length,
);

export const selectUserDataLatest = createDraftSafeSelector(
	selectUser,
	(user) => user.data[user.data.length - 1],
);

export const selectUserSelected = createDraftSafeSelector(
	selectUser,
	(user) => user.selectedUser,
);
