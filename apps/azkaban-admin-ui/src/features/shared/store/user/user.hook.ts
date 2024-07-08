import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '../store';
import { useLazyFetchUserListQuery } from './user.api';
import { useCallback } from 'react';
import {
    selectUserData,
    selectUserDataCount,
    selectUserDataLatest,
    selectUserSelected,
} from './user.selector';

export function useUserState() {
    const dispatch = useDispatch<AppDispatch>();
    const [fetchUserListTrigger] = useLazyFetchUserListQuery();

    const data = useAppSelector(selectUserData);
    const dataCount = useAppSelector(selectUserDataCount);
    const selectedUser = useAppSelector(selectUserSelected);
    const latestUser = useAppSelector(selectUserDataLatest);

    const fetchUserList = useCallback(() => {
        fetchUserListTrigger();
    }, [fetchUserListTrigger]);

    return {
        fetchUserList,
        data,
        dataCount,
        latestUser,
        selectedUser,
    };
}
