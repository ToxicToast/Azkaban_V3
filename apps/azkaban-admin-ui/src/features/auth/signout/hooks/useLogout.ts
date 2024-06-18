import { useCallback } from 'react';
import { useAuthState } from '../../../shared/store/auth/auth.hook';
import { useNavigate } from 'react-router-dom';
import { toastService } from '../../../shared';

export function useLogout() {
    const { logoutUser } = useAuthState();
    const navigate = useNavigate();

    const logout = useCallback(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('exp');
        //
        toastService.sendToast({
            text: 'You have been logged out',
            type: 'success',
        });
        //
        const timeout = setTimeout(() => {
            logoutUser();
            navigate('/');
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [logoutUser, navigate]);

    return {
        logout,
    };
}
