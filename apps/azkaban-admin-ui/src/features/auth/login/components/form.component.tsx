import { useCallback, useState } from 'react';
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';
import { useAuthState } from '../../../../store/auth/auth.hook';
import { useUiState } from '../../../../store/ui/ui.hook';
import { SignInButton } from '../widgets/signin-button';

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
        <>
            <form action="#" className="mt-6 grid grid-cols-6 gap-4">
                <div className="col-span-6">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        name="username"
                        value={username}
                        onChange={(event) => changeUsername(event.target.value)}
                        required={true}
                    />
                </div>
                <div className="col-span-6">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(event) => changePassword(event.target.value)}
                        required={true}
                    />
                </div>
            </form>

            <SignInButton onClick={onSubmit} disabled={signInButtonDisabled} />
        </>
    );
}
