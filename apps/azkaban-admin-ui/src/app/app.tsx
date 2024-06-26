import { Routes } from './router';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuthState } from '../features/shared/store/auth/auth.hook';
import { useUserState } from '../features/shared/store/user/user.hook';
import { useEffect } from 'react';

export function App() {
    const { isAuthenticated } = useAuthState();

    const { fetchUserList } = useUserState();

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserList();
        }
    }, [fetchUserList, isAuthenticated]);

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Routes isAuthenticated={isAuthenticated} />
        </ErrorBoundary>
    );
}

export default App;
