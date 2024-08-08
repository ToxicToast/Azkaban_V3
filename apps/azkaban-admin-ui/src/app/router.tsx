import { lazy } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Redirect } from '../features/shared';
import {
	authLoginRoute,
	authRefreshRoute,
	authSignoutRoute,
	dashboardRoute,
	foodfolioBrandAddRoute,
	foodfolioBrandRoute,
	foodfolioBrandViewRoute,
	foodfolioCategoryAddRoute,
	foodfolioCategoryRoute,
	foodfolioCategoryViewRoute,
	foodfolioLocationAddRoute,
	foodfolioLocationRoute,
	foodfolioRoute,
	groupsRoute,
	notificationsRoute,
	usersRoute,
	viewUsersRoute,
	wildcardRoute,
} from '../config/routes';

// Layouts
const LazyAuthLayout = lazy(
	() => import('../features/shared/components/layout/auth.layout'),
);
const LazyDashboardLayout = lazy(
	() => import('../features/shared/components/layout/dashboard.layout'),
);
// Pages
const LazyLoginPage = lazy(
	() => import('../features/auth/login/pages/login.page'),
);
const LazySignoutPage = lazy(
	() => import('../features/auth/signout/pages/signout.page'),
);
const LazyRefreshPage = lazy(
	() => import('../features/auth/refresh/pages/refresh.page'),
);
const LazyDashboardPage = lazy(
	() => import('../features/dashboard/dashboard.page'),
);
const LazyUserDashboardPage = lazy(
	() => import('../features/users/dashboards/user.dashboard'),
);
const LazyUserViewPage = lazy(() => import('../features/users/pages/view'));
const LazyGroupsDashboardPage = lazy(
	() => import('../features/groups/dashboards/group.dashboard'),
);
const LazyNotificationsDashboardPage = lazy(
	() => import('../features/notifications/dashboards/notification.dashboard'),
);
const LazyFoodFolioCategoryPage = lazy(
	() => import('../features/foodfolio/dashboards/category.dashboard'),
);
const LazyFoodFolioCategoryViewPage = lazy(
	() => import('../features/foodfolio/pages/category-view.page'),
);
const LazyFoodFolioCategoryAddPage = lazy(
	() => import('../features/foodfolio/pages/category-add.page'),
);
const LazyFoodFolioBrandPage = lazy(
	() => import('../features/foodfolio/dashboards/brands.dashboard'),
);
const LazyFoodFolioBrandAddPage = lazy(
	() => import('../features/foodfolio/pages/brand-add.page'),
);
const LazyFoodFolioLocationPage = lazy(
	() => import('../features/foodfolio/dashboards/location.dashboard'),
);
const LazyFoodFolioLocationAddPage = lazy(
	() => import('../features/foodfolio/pages/location-add.page'),
);

interface Props {
	isAuthenticated: boolean;
}

const authenticatedRoutes = [
	{
		element: <LazyDashboardLayout />,
		hasErrorBoundary: true,
		errorElement: <div>Failed loading Layout</div>,
		children: [
			{
				path: wildcardRoute,
				element: <Redirect path={dashboardRoute} />,
				hasErrorBoundary: true,
			},
			{
				path: dashboardRoute,
				element: <LazyDashboardPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Dashboard</div>,
			},
			{
				path: usersRoute,
				element: <LazyUserDashboardPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Users</div>,
			},
			{
				path: viewUsersRoute,
				element: <LazyUserViewPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Users</div>,
			},
			{
				path: groupsRoute,
				element: <LazyGroupsDashboardPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Groups</div>,
			},
			{
				path: notificationsRoute,
				element: <LazyNotificationsDashboardPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Notifications</div>,
			},
			{
				path: authSignoutRoute,
				element: <LazySignoutPage />,
				hasErrorBoundary: true,
			},
			{
				path: authRefreshRoute,
				element: <LazyRefreshPage />,
				hasErrorBoundary: true,
			},
			{
				path: foodfolioRoute,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Foodfolio</div>,
				children: [
					{
						path: foodfolioCategoryRoute,
						element: <LazyFoodFolioCategoryPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioCategoryViewRoute,
						element: <LazyFoodFolioCategoryViewPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioCategoryAddRoute,
						element: <LazyFoodFolioCategoryAddPage />,
						hasErrorBoundary: true,
					},
					//
					{
						path: foodfolioBrandRoute,
						element: <LazyFoodFolioBrandPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioBrandViewRoute,
						element: <LazyFoodFolioBrandPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioBrandAddRoute,
						element: <LazyFoodFolioBrandAddPage />,
						hasErrorBoundary: true,
					},
					//
					{
						path: foodfolioLocationRoute,
						element: <LazyFoodFolioLocationPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioLocationAddRoute,
						element: <LazyFoodFolioLocationAddPage />,
						hasErrorBoundary: true,
					},
				],
			},
		],
	},
];

const guestRoutes = [
	{
		element: <LazyAuthLayout />,
		hasErrorBoundary: true,
		errorElement: <div>error</div>,
		children: [
			{
				path: wildcardRoute,
				element: <Redirect path={authLoginRoute} />,
				hasErrorBoundary: true,
			},
			{
				path: authLoginRoute,
				element: <LazyLoginPage />,
				hasErrorBoundary: true,
			},
		],
	},
];

export function Routes(props: Props) {
	const { isAuthenticated } = props;

	const router = createHashRouter(
		isAuthenticated ? authenticatedRoutes : guestRoutes,
	);

	return <RouterProvider router={router} />;
}
