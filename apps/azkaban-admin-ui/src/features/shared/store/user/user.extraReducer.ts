import {
	ActionReducerMapBuilder,
	Draft,
	PayloadAction,
} from '@reduxjs/toolkit';
import { UserModel } from './user.model';
import { userApi } from './user.api';
import { User } from '@toxictoast/azkaban-sdk';
import { RejectedAction } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { HttpError } from '../../types';
import { toastService } from '../../service';

export const fetchUsersFullfilled = (
	builder: ActionReducerMapBuilder<UserModel>,
) => {
	builder.addMatcher(
		userApi.endpoints?.fetchUserList.matchFulfilled,
		(state: Draft<UserModel>, action: PayloadAction<Array<User>>) => {
			const payload = action.payload;
			//
			state.data = payload;
		},
	);
};

export const fetchUsersRejected = (
	builder: ActionReducerMapBuilder<UserModel>,
) => {
	builder.addMatcher(
		userApi.endpoints?.fetchUserList.matchRejected,
		(state: Draft<UserModel>, action: RejectedAction<any, any>) => {
			const { payload } = action as { payload: HttpError };
			toastService.sendToast({
				text: payload.data.message,
				type: 'danger',
			});
		},
	);
};
