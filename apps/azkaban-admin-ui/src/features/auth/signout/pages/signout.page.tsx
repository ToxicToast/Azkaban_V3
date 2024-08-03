import { useLogout } from '../hooks';
import { useEffect } from 'react';

function SignoutPage() {
	const { logout } = useLogout();

	useEffect(() => {
		logout();
	}, [logout]);

	return (
		<div>
			<h1>Signing out...</h1>
		</div>
	);
}

export default SignoutPage;
