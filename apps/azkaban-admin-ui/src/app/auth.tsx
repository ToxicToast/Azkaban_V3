import { useEffect } from 'react';

interface Props {
	isAuthenticated: boolean;
	expireTime: number;
	refreshToken: () => void;
}

export function Auth(props: Props) {
	const { isAuthenticated, expireTime, refreshToken } = props;

	useEffect(() => {
		const interval = setInterval(() => {
			if (isAuthenticated) {
				const dateNow = new Date();
				const dateExpire = new Date(expireTime * 1000);
				const diff = dateExpire.getTime() - dateNow.getTime();
				if (diff <= 10000) {
					refreshToken();
				}
			}
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [expireTime, isAuthenticated, refreshToken]);

	return null;
}
