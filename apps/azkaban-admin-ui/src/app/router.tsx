import { lazy } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Badge, Redirect } from '../features/shared';
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
	foodfolioProductDetailAddRoute,
	foodfolioProductDetailRoute,
	foodfolioProductDetailViewRoute,
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
const LazyFoodFolioProductDetailsPage = lazy(
	() => import('../features/foodfolio/dashboards/product-detail.dashboard'),
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
		errorElement: (
			<Badge variant="destructive">Failed loading Layout</Badge>
		),
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
				errorElement: (
					<Badge variant="destructive">
						Failed loading Dashboard
					</Badge>
				),
			},
			{
				path: usersRoute,
				element: <LazyUserDashboardPage />,
				hasErrorBoundary: true,
				errorElement: (
					<Badge variant="destructive">Failed loading Users</Badge>
				),
			},
			{
				path: viewUsersRoute,
				element: <LazyUserViewPage />,
				hasErrorBoundary: true,
				errorElement: (
					<Badge variant="destructive">Failed loading User</Badge>
				),
			},
			{
				path: groupsRoute,
				element: <LazyGroupsDashboardPage />,
				hasErrorBoundary: true,
				errorElement: (
					<Badge variant="destructive">Failed loading Groups</Badge>
				),
			},
			{
				path: notificationsRoute,
				element: <LazyNotificationsDashboardPage />,
				hasErrorBoundary: true,
				errorElement: (
					<Badge variant="destructive">
						Failed loading Notifications
					</Badge>
				),
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
				errorElement: (
					<Badge variant="destructive">
						Failed loading Foodfolio
					</Badge>
				),
				children: [
					// Dashboards
					{
						path: foodfolioCategoryRoute,
						element: <LazyFoodFolioCategoryPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Categories
							</Badge>
						),
					},
					{
						path: foodfolioBrandRoute,
						element: <LazyFoodFolioBrandPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Brands
							</Badge>
						),
					},
					{
						path: foodfolioLocationRoute,
						element: <LazyFoodFolioLocationPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Locations
							</Badge>
						),
					},
					{
						path: foodfolioSizeRoute,
						element: <LazyFoodFolioSizesPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Sizes
							</Badge>
						),
					},
					{
						path: foodfolioTypeRoute,
						element: <LazyFoodFolioTypesPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Types
							</Badge>
						),
					},
					{
						path: foodfolioWarehouseRoute,
						element: <LazyFoodFolioWarehousesPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Warehouses
							</Badge>
						),
					},
					{
						path: foodfolioProductRoute,
						element: <LazyFoodFolioProductsPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Products
							</Badge>
						),
					},
					{
						path: foodfolioProductDetailRoute,
						element: <LazyFoodFolioProductDetailsPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Product Details
							</Badge>
						),
					},
					// View Pages
					{
						path: foodfolioCategoryViewRoute,
						element: <LazyFoodFolioCategoryViewPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Category
							</Badge>
						),
					},
					{
						path: foodfolioBrandViewRoute,
						element: <>BRAND VIEW</>,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Brand
							</Badge>
						),
					},
					{
						path: foodfolioLocationViewRoute,
						element: <>LOCATION VIEW</>,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Location
							</Badge>
						),
					},
					{
						path: foodfolioSizeViewRoute,
						element: <>SIZE VIEW</>,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Size
							</Badge>
						),
					},
					{
						path: foodfolioTypeViewRoute,
						element: <>TYPE VIEW</>,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Type
							</Badge>
						),
					},
					{
						path: foodfolioWarehouseViewRoute,
						element: <>WAREHOUSE VIEW</>,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Warehouse
							</Badge>
						),
					},
					{
						path: foodfolioProductViewRoute,
						element: <>PRODUCT VIEW</>,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Product
							</Badge>
						),
					},
					{
						path: foodfolioProductDetailViewRoute,
						element: <>PRODUCT DETAIL VIEW</>,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Product Detail
							</Badge>
						),
					},
					// Add Pages
					{
						path: foodfolioCategoryAddRoute,
						element: <LazyFoodFolioCategoryAddPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Category Draft
							</Badge>
						),
					},
					{
						path: foodfolioBrandAddRoute,
						element: <LazyFoodFolioBrandAddPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Brand Draft
							</Badge>
						),
					},
					{
						path: foodfolioLocationAddRoute,
						element: <LazyFoodFolioLocationAddPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Location Draft
							</Badge>
						),
					},
					{
						path: foodfolioSizeAddRoute,
						element: <LazyFoodFolioSizeAddPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Size Draft
							</Badge>
						),
					},
					{
						path: foodfolioTypeAddRoute,
						element: <LazyFoodFolioTypeAddPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Type Draft
							</Badge>
						),
					},
					{
						path: foodfolioWarehouseAddRoute,
						element: <LazyFoodFolioWarehouseAddPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Warehouse Draft
							</Badge>
						),
					},
					{
						path: foodfolioProductAddRoute,
						element: <LazyFoodFolioProductAddPage />,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Product Draft
							</Badge>
						),
					},
					{
						path: foodfolioProductDetailAddRoute,
						element: <>PRODUCT DETAIL VIEW</>,
						hasErrorBoundary: true,
						errorElement: (
							<Badge variant="destructive">
								Failed loading Product Detail Draft
							</Badge>
						),
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
