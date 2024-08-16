import { useMemo } from 'react';
import { Button } from '../ui';

interface Props {
	isBanned: boolean;
}

export function Banned(props: Props) {
	const { isBanned } = props;

	const statusButtonVariant = useMemo(() => {
		return isBanned ? 'destructive' : 'secondary';
	}, [isBanned]);

	const statusButtonText = useMemo(() => {
		return isBanned ? 'Banned' : 'Active';
	}, [isBanned]);

	return <Button variant={statusButtonVariant}>{statusButtonText}</Button>;
}
