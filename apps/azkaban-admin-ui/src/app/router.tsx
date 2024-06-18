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

interface Props {
    isAuthenticated: boolean;
}

const authenticatedRoutes = [
    {
        element: <LazyDashboardLayout />,
        hasErrorBoundary: true,
        errorElement: <div>error</div>,
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
            },
            {
                path: '/auth/signout',
                element: <LazySignoutPage />,
                hasErrorBoundary: true,
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
