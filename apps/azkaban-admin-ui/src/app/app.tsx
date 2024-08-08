import { Routes } from './router';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuthState } from '../features/shared/store/auth/auth.hook';
import { useUserState } from '../features/shared/store/user/user.hook';
import { useEffect } from 'react';
import {
	useBrandState,
	useCategoryState,
	useLocationState,
	useSizeState,
} from '../features/shared/store/foodfolio';

export function App() {
	const { isAuthenticated } = useAuthState();

	const { fetchUserListTrigger } = useUserState();
	const { fetchCategoriesTrigger } = useCategoryState();
	const { fetchBrandsTrigger } = useBrandState();
	const { fetchLocationsTrigger } = useLocationState();
	const { fetchSizesTrigger } = useSizeState();

	useEffect(() => {
		if (isAuthenticated) {
			fetchUserListTrigger();
			fetchCategoriesTrigger();
			fetchBrandsTrigger();
			fetchLocationsTrigger();
			fetchSizesTrigger();
		}
	}, [
		fetchSizesTrigger,
		fetchLocationsTrigger,
		fetchBrandsTrigger,
		fetchCategoriesTrigger,
		fetchUserListTrigger,
		isAuthenticated,
	]);

	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<Routes isAuthenticated={isAuthenticated} />
		</ErrorBoundary>
	);
}

export default App;
