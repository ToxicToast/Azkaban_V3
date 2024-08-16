import { useMemo } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../ui';

interface Props {
	isDeleted: boolean;
	type: string;
}

export function Restore(props: Props) {
	const { isDeleted, type } = props;

	const statusButtonVariant = useMemo(() => {
		return isDeleted ? 'destructive' : 'secondary';
	}, [isDeleted]);

	const statusButtonText = useMemo(() => {
		return isDeleted ? 'Restore' : ' ';
	}, [isDeleted]);

	return (
		<Card hidden={!isDeleted}>
			<CardHeader>
				<CardTitle>Restore {type}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<Button variant={statusButtonVariant}>
							{statusButtonText}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
