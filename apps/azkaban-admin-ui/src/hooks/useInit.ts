import { useCallback } from 'react';
import { useAuthState } from '../store/auth/auth.hook';

export function useInit() {
  const { isAuthenticated } = useAuthState();

  const initUser = useCallback(() => {
    if (isAuthenticated) {
      console.error('load users');
    }
  }, [isAuthenticated]);

  const initGroups = useCallback(() => {
    if (isAuthenticated) {
      console.error('load groups');
    }
  }, [isAuthenticated]);

  return {
    initUser,
    initGroups,
  };
}
