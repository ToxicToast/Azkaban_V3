import { Routes } from './router';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuthState } from '../features/shared/store/auth/auth.hook';
import { Foodfolio } from './foodfolio';
import { Azkaban } from './azkaban';

export function App() {
	const { isAuthenticated } = useAuthState();

	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Azkaban isAuthenticated={isAuthenticated} />
			<Foodfolio isAuthenticated={isAuthenticated} />
			<Routes isAuthenticated={isAuthenticated} />
		</ErrorBoundary>
	);
}

export default App;
