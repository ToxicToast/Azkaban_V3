import { useCallback } from 'react';

export function useLogout() {
    const logout = useCallback(() => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('exp');
    }, []);

    return {
        logout,
    };
}
