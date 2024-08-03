import { useCallback, useState } from 'react';
import { SignInButton } from '../widgets';
import { useAuthState } from '../../../shared/store/auth/auth.hook';
import { useUiState } from '../../../shared/store/ui/ui.hook';
import { Input, Label } from '../../../shared';

export function AuthLoginForm() {
	const { loginUser } = useAuthState();
	const { signInButtonDisabled } = useUiState();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const onSubmit = useCallback(() => {
		loginUser(username, password);
	}, [loginUser, password, username]);

	const changeUsername = useCallback((value: string) => {
		setUsername(value);
	}, []);

	const changePassword = useCallback((value: string) => {
		setPassword(value);
	}, []);

	return (
		<form action="#" className="mt-6 grid grid-cols-6 gap-4">
			<div className="col-span-12">
				<Label htmlFor="username">Username</Label>
				<Input
					id="username"
					name="username"
					value={username}
					onChange={(event) => changeUsername(event.target.value)}
					required={true}
					disabled={signInButtonDisabled}
				/>
			</div>
			<div className="col-span-12">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					name="password"
					type="password"
					value={password}
					onChange={(event) => changePassword(event.target.value)}
					required={true}
					disabled={signInButtonDisabled}
				/>
			</div>

			<div className="col-span-12">
				<SignInButton
					onClick={onSubmit}
					disabled={signInButtonDisabled}
				/>
			</div>
		</form>
	);
}
