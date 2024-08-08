import { AppDispatch, useAppSelector } from '../store';
import { useLoginUserMutation, useRefreshTokenMutation } from './auth.api';
import { useCallback } from 'react';
import {
	selectAuthActivationToken,
	selectAuthExpireTime,
	selectAuthGroups,
	selectAuthId,
	selectAuthIsActive,
	selectAuthIsAuthenticated,
	selectAuthIsBanned,
	selectAuthToken,
	selectAuthUsername,
} from './auth.selector';
import { Auth } from '@toxictoast/azkaban-sdk';
import { setUser, setLogout } from './auth.slice';
import { useDispatch } from 'react-redux';

export function useAuthState() {
	const dispatch = useDispatch<AppDispatch>();
	const [loginUserTrigger] = useLoginUserMutation();
	const [refreshTokenTrigger] = useRefreshTokenMutation();

	const id = useAppSelector(selectAuthId);
	const username = useAppSelector(selectAuthUsername);
	const groups = useAppSelector(selectAuthGroups);
	const token = useAppSelector(selectAuthToken);
	const isAuthenticated = useAppSelector(selectAuthIsAuthenticated);
	const isActive = useAppSelector(selectAuthIsActive);
	const isBanned = useAppSelector(selectAuthIsBanned);
	const activationToken = useAppSelector(selectAuthActivationToken);
	const expireTime = useAppSelector(selectAuthExpireTime);

	const loginUser = useCallback(
		(username: string, password: string) => {
			loginUserTrigger({ username, password });
		},
		[loginUserTrigger],
	);

	const refreshToken = useCallback(() => {
		refreshTokenTrigger();
	}, [refreshTokenTrigger]);

	const authenticateUser = useCallback(
		(auth: Auth) => {
			dispatch(setUser(auth));
		},
		[dispatch],
	);

	const logoutUser = useCallback(() => {
		dispatch(setLogout());
	}, [dispatch]);

	return {
		id,
		username,
		groups,
		token,
		isAuthenticated,
		isActive,
		isBanned,
		activationToken,
		expireTime,
		//
		loginUser,
		refreshToken,
		logoutUser,
		authenticateUser,
	};
}
