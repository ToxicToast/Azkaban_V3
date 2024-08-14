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
	foodfolioLocationViewRoute,
	foodfolioProductAddRoute,
	foodfolioProductRoute,
	foodfolioProductViewRoute,
	foodfolioRoute,
	foodfolioSizeAddRoute,
	foodfolioSizeRoute,
	foodfolioSizeViewRoute,
	foodfolioTypeAddRoute,
	foodfolioTypeRoute,
	foodfolioTypeViewRoute,
	foodfolioWarehouseAddRoute,
	foodfolioWarehouseRoute,
	foodfolioWarehouseViewRoute,
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
// Dashboards
const LazyDashboardPage = lazy(
	() => import('../features/dashboard/dashboard.page'),
);
const LazyUserDashboardPage = lazy(
	() => import('../features/users/dashboards/user.dashboard'),
);
const LazyGroupsDashboardPage = lazy(
	() => import('../features/groups/dashboards/group.dashboard'),
);
const LazyNotificationsDashboardPage = lazy(
	() => import('../features/notifications/dashboards/notification.dashboard'),
);
const LazyFoodFolioCategoryPage = lazy(
	() => import('../features/foodfolio/dashboards/category.dashboard'),
);
const LazyFoodFolioBrandPage = lazy(
	() => import('../features/foodfolio/dashboards/brands.dashboard'),
);
const LazyFoodFolioLocationPage = lazy(
	() => import('../features/foodfolio/dashboards/location.dashboard'),
);
const LazyFoodFolioSizesPage = lazy(
	() => import('../features/foodfolio/dashboards/sizes.dashboard'),
);
const LazyFoodFolioTypesPage = lazy(
	() => import('../features/foodfolio/dashboards/types.dashboard'),
);
const LazyFoodFolioWarehousesPage = lazy(
	() => import('../features/foodfolio/dashboards/warehouse.dashboard'),
);
const LazyFoodFolioProductsPage = lazy(
	() => import('../features/foodfolio/dashboards/product.dashboard'),
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

const LazyUserViewPage = lazy(() => import('../features/users/pages/view'));

const LazyFoodFolioCategoryViewPage = lazy(
	() => import('../features/foodfolio/pages/category-view.page'),
);
const LazyFoodFolioCategoryAddPage = lazy(
	() => import('../features/foodfolio/pages/category-add.page'),
);

const LazyFoodFolioBrandAddPage = lazy(
	() => import('../features/foodfolio/pages/brand-add.page'),
);

const LazyFoodFolioLocationAddPage = lazy(
	() => import('../features/foodfolio/pages/location-add.page'),
);
const LazyFoodFolioSizeAddPage = lazy(
	() => import('../features/foodfolio/pages/size-add.page'),
);
const LazyFoodFolioTypeAddPage = lazy(
	() => import('../features/foodfolio/pages/type-add.page'),
);
const LazyFoodFolioWarehouseAddPage = lazy(
	() => import('../features/foodfolio/pages/warehouse-add.page'),
);
const LazyFoodFolioProductAddPage = lazy(
	() => import('../features/foodfolio/pages/product-add.page'),
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
					// Dashboards
					{
						path: foodfolioCategoryRoute,
						element: <LazyFoodFolioCategoryPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioBrandRoute,
						element: <LazyFoodFolioBrandPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioLocationRoute,
						element: <LazyFoodFolioLocationPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioSizeRoute,
						element: <LazyFoodFolioSizesPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioTypeRoute,
						element: <LazyFoodFolioTypesPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioWarehouseRoute,
						element: <LazyFoodFolioWarehousesPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioProductRoute,
						element: <LazyFoodFolioProductsPage />,
						hasErrorBoundary: true,
					},
					// View Pages
					{
						path: foodfolioCategoryViewRoute,
						element: <LazyFoodFolioCategoryViewPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioBrandViewRoute,
						element: <>BRAND VIEW</>,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioLocationViewRoute,
						element: <>LOCATION VIEW</>,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioSizeViewRoute,
						element: <>SIZE VIEW</>,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioTypeViewRoute,
						element: <>TYPE VIEW</>,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioWarehouseViewRoute,
						element: <>WAREHOUSE VIEW</>,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioProductViewRoute,
						element: <>PRODUCT VIEW</>,
						hasErrorBoundary: true,
					},
					// Add Pages
					{
						path: foodfolioCategoryAddRoute,
						element: <LazyFoodFolioCategoryAddPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioBrandAddRoute,
						element: <LazyFoodFolioBrandAddPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioLocationAddRoute,
						element: <LazyFoodFolioLocationAddPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioSizeAddRoute,
						element: <LazyFoodFolioSizeAddPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioTypeAddRoute,
						element: <LazyFoodFolioTypeAddPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioWarehouseAddRoute,
						element: <LazyFoodFolioWarehouseAddPage />,
						hasErrorBoundary: true,
					},
					{
						path: foodfolioProductAddRoute,
						element: <LazyFoodFolioProductAddPage />,
						hasErrorBoundary: true,
					},
					// Edit Pages
					// Delete Pages
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
