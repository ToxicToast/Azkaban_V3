import { RootState } from '../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

const selectUi = (state: RootState) => state.ui;

export const selectSignInButtonDisabled = createDraftSafeSelector(
  selectUi,
  (ui) => ui.signInButtonDisabled,
);
