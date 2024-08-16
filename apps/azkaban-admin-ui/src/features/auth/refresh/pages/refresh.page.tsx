import { useAuthState } from '../../../shared/store/auth/auth.hook';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { dashboardRoute } from '../../../../config/routes';

function RefreshPage() {
	const { refreshToken } = useAuthState();
	const navigate = useNavigate();

	const navigateBack = useCallback(() => {
		navigate(dashboardRoute);
	}, [navigate]);

	useEffect(() => {
		refreshToken();
		navigateBack();
	}, [navigateBack, refreshToken]);

	return null;
}

export default RefreshPage;
