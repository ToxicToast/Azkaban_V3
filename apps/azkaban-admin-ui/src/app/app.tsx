import { Routes } from './router';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuthState } from '../features/shared/store/auth/auth.hook';
import { Foodfolio } from './foodfolio';
import { Azkaban } from './azkaban';
import { Auth } from './auth';

export function App() {
	const { isAuthenticated, expireTime, refreshToken } = useAuthState();

	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Azkaban isAuthenticated={isAuthenticated} />
			<Foodfolio isAuthenticated={isAuthenticated} />
			<Auth
				isAuthenticated={isAuthenticated}
				expireTime={expireTime ?? 0}
				refreshToken={() => refreshToken()}
			/>
			<Routes isAuthenticated={isAuthenticated} />
		</ErrorBoundary>
	);
}

export default App;
