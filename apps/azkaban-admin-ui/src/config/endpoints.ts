export const authEndpoint = '/auth';
export const authLoginEndpoint = `${authEndpoint}/login`;
export const authLoginWithCookieEndpoint = `${authLoginEndpoint}/cookie`;
export const authRefreshEndpoint = `${authEndpoint}/refresh`;

export const userEndpoint = '/user';

export const foodfolioEndpoint = '/foodfolio';
export const foodfolioCategoryEndpoint = `${foodfolioEndpoint}/category`;
export const foodfolioCompanyEndpoint = `${foodfolioEndpoint}/company`;
export const foodfolioLocationEndpoint = `${foodfolioEndpoint}/location`;
export const foodfolioSizeEndpoint = `${foodfolioEndpoint}/size`;
export const foodfolioTypeEndpoint = `${foodfolioEndpoint}/type`;
export const foodfolioWarehouseEndpoint = `${foodfolioEndpoint}/warehouse`;
export const foodfolioProductEndpoint = `${foodfolioEndpoint}/item`;
export const foodfolioProductDetailEndpoint = `${foodfolioEndpoint}/item-detail`;
export const foodfolioProductVariantEndpoint = `${foodfolioEndpoint}/item-variant`;

export const sseEndpoint = 'https://sse-dev.toxictoast.de/api/sse';
