import { Routes } from './router';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuthState } from '../features/shared/store/auth/auth.hook';

export function App() {
    const { isAuthenticated } = useAuthState();

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Routes isAuthenticated={isAuthenticated} />
        </ErrorBoundary>
    );
}

export default App;
