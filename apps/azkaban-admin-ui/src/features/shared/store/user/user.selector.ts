import { RootState } from '../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { Nullable } from '@toxictoast/azkaban-base-types';

const selectUser = (state: RootState) => state.user.user;

export const selectUserData = createDraftSafeSelector(
	selectUser,
	(user) => user.data,
);

export const selectSelectedUserId = createDraftSafeSelector(
	selectUser,
	(user) => user.selectedId,
);

export const selectSelectedUser = createDraftSafeSelector(
	selectUser,
	selectSelectedUserId,
	(user, selectedId: Nullable<string>) => {
		if (selectedId !== null) {
			return user.data.find((user) => user.id === selectedId);
		}
		return null;
	},
);

export const selectUserDataCount = createDraftSafeSelector(
	selectUser,
	(user) => user.data.length,
);

export const selectUserDataLatest = createDraftSafeSelector(
	selectUser,
	(user) => user.data[user.data.length - 1],
);
