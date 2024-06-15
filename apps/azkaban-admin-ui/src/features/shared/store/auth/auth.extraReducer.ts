import {
    ActionReducerMapBuilder,
    Draft,
    PayloadAction,
} from '@reduxjs/toolkit';
import { AuthModel } from './auth.model';
import { authApi } from './auth.api';
import { Auth } from '@toxictoast/azkaban-sdk';
import { RejectedAction } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { toastService } from '../../service';
import { HttpError } from '../../types';

export const userLoginFullfilled = (
    builder: ActionReducerMapBuilder<AuthModel>,
) => {
    builder.addMatcher(
        authApi.endpoints?.loginUser.matchFulfilled,
        (state: Draft<AuthModel>, action: PayloadAction<Auth>) => {
            const payload = action.payload;
            const { user, token, exp } = payload;
            //
            state.id = user.id;
            state.username = user.username;
            state.groups = user.groups;
            state.token = token;
            state.isAuthenticated = true;
            state.isActive = user.isActive;
            state.isBanned = user.isBanned;
            state.activation_token = user.activation_token;
            state.expireTime = exp;
            //
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('exp', exp.toString());
            //
            toastService.sendToast({
                text: `Successfully logged in as ${user.username}`,
                type: 'success',
            });
        },
    );
};

export const userLoginRejected = (
    builder: ActionReducerMapBuilder<AuthModel>,
) => {
    builder.addMatcher(
        authApi.endpoints?.loginUser.matchRejected,
        (state: Draft<AuthModel>, action: RejectedAction<any, any>) => {
            const { payload } = action as { payload: HttpError };
            toastService.sendToast({
                text: payload.data.message,
                type: 'danger',
            });
        },
    );
};
