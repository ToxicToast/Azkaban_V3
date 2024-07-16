import { ConfigModel } from './config.model';

export const configState: ConfigModel = {
    baseUrl:
        import.meta.env['VITE_AZKABAN_BASE_URL'] ??
        process.env.VITE_AZKABAN_BASE_URL ??
        '',
    version:
        import.meta.env['VITE_AZKABAN_VERSION'] ??
        process.env.VITE_AZKABAN_VERSION ??
        'v0.0.0',
};
