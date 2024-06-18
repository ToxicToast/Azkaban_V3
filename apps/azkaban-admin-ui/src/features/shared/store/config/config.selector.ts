import { RootState } from '../store';
import { createDraftSafeSelector } from '@reduxjs/toolkit';

const selectConfig = (state: RootState) => state.config;

export const selectConfigBaseUrl = createDraftSafeSelector(
    selectConfig,
    (config) => config.baseUrl,
);

export const selectConfigVersion = createDraftSafeSelector(
    selectConfig,
    (config) => config.version,
);
