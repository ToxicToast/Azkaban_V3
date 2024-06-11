import { useAuthState } from '../store/auth/auth.hook';
import { Routes } from './router';
import { ErrorBoundary } from 'react-error-boundary';

export function App() {
    const { isAuthenticated } = useAuthState();

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Routes isAuthenticated={isAuthenticated} />
        </ErrorBoundary>
    );
}

export default App;
