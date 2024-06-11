import { lazy } from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Redirect } from '../components/widgets/redirect.widget';

// Layouts
const LazyAuthLayout = lazy(() => import('../components/layout/auth.layout'));
const LazyDashboardLayout = lazy(
    () => import('../components/layout/dashboard.layout'),
);
// Pages
const LazyLoginPage = lazy(() => import('../features/auth/login/login.page'));
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
