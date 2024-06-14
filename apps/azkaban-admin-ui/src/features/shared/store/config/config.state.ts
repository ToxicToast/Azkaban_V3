import { ConfigModel } from './config.model';

export const configState: ConfigModel = {
    baseUrl: import.meta.env['VITE_AZKABAN_BASE_URL'],
};
