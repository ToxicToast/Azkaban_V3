export const homeRoute = '/';

export const dashboardRoute = '/dashboard';

export const usersRoute = '/users';
export const viewUsersRoute = '/users/view/:id';
export const editUsersRoute = '/users/edit/:id';
export const deleteUsersRoute = '/users/delete/:id';

export const groupsRoute = '/groups';

export const notificationsRoute = '/notifications';

export const authRoute = '/auth';
export const authSignoutRoute = `${authRoute}/signout`;
export const authLoginRoute = `${authRoute}/login`;

export const foodfolioRoute = '/foodfolio';
export const foodfolioCategoryRoute = `${foodfolioRoute}/category`;
export const foodfolioCategoryViewRoute = `${foodfolioCategoryRoute}/view/:id`;
export const foodfolioCategoryAddRoute = `${foodfolioCategoryRoute}/add`;

export const foodfolioBrandRoute = `${foodfolioRoute}/brand`;
export const foodfolioBrandViewRoute = `${foodfolioBrandRoute}/view/:id`;

export const foodfolioLocationRoute = `${foodfolioRoute}/location`;
export const foodfolioLocationViewRoute = `${foodfolioLocationRoute}/view/:id`;

export const wildcardRoute = '*';
