import { useMemo } from 'react';
import { Button } from '../ui';

interface Props {
	isActive: boolean;
}

export function Status(props: Props) {
	const { isActive } = props;

	const statusButtonVariant = useMemo(() => {
		return isActive ? 'secondary' : 'destructive';
	}, [isActive]);

	const statusButtonText = useMemo(() => {
		return isActive ? 'Active' : 'Inactive';
	}, [isActive]);

	return <Button variant={statusButtonVariant}>{statusButtonText}</Button>;
}
