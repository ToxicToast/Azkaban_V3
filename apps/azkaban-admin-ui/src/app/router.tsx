import { lazy } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Redirect } from '../features/shared';

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
				path: '*',
				element: <Redirect path="/dashboard" />,
				hasErrorBoundary: true,
			},
			{
				path: '/dashboard',
				element: <LazyDashboardPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Dashboard</div>,
			},
			{
				path: '/users',
				element: <LazyUserDashboardPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Users</div>,
			},
			{
				path: '/users/view/:id',
				element: <LazyUserViewPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Users</div>,
			},
			{
				path: '/groups',
				element: <LazyGroupsDashboardPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Groups</div>,
			},
			{
				path: '/notifications',
				element: <LazyNotificationsDashboardPage />,
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Notifications</div>,
			},
			{
				path: '/auth/signout',
				element: <LazySignoutPage />,
				hasErrorBoundary: true,
			},
			{
				path: 'foodfolio',
				hasErrorBoundary: true,
				errorElement: <div>Failed loading Foodfolio</div>,
				children: [
					{
						path: '/foodfolio/category',
						element: <LazyFoodFolioCategoryPage />,
						hasErrorBoundary: true,
					},
					{
						path: '/foodfolio/category/view/:id',
						element: <LazyFoodFolioCategoryViewPage />,
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
				path: '*',
				element: <Redirect path="/auth/login" />,
				hasErrorBoundary: true,
			},
			{
				path: '/auth/login',
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
