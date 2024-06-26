import { useUserState } from '../../shared/store/user/user.hook';

export function useAzkabanStatsViewmodel() {
    const { dataCount: userDataCount, latestUser } = useUserState();

    return {
        userDataCount,
        latestUser,
    };
}
