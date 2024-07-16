import { ConfigModel } from './config.model';

export const configState: ConfigModel = {
    baseUrl: 'https://api-dev.toxictoast.de/api',
    version:
        import.meta.env['VITE_AZKABAN_VERSION'] ??
        process.env.VITE_AZKABAN_VERSION ??
        'v0.0.0',
};
