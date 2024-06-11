import { ActionReducerMapBuilder, Draft } from '@reduxjs/toolkit';
import { UiModel } from './ui.model';
import { authApi } from '../auth/auth.api';

export const userLoginPending = (builder: ActionReducerMapBuilder<UiModel>) => {
  builder.addMatcher(
    authApi.endpoints?.loginUser.matchPending,
    (state: Draft<UiModel>) => {
      state.signInButtonDisabled = true;
    },
  );
};

export const userLoginFullfilled = (
  builder: ActionReducerMapBuilder<UiModel>,
) => {
  builder.addMatcher(
    authApi.endpoints?.loginUser.matchFulfilled,
    (state: Draft<UiModel>) => {
      state.signInButtonDisabled = false;
    },
  );
};

export const userLoginRejected = (
  builder: ActionReducerMapBuilder<UiModel>,
) => {
  builder.addMatcher(
    authApi.endpoints?.loginUser.matchRejected,
    (state: Draft<UiModel>) => {
      state.signInButtonDisabled = false;
    },
  );
};
