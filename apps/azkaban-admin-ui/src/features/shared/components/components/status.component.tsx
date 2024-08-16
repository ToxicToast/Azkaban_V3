import { useMemo } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '../ui';

interface Props {
	isActive: boolean;
	type: string;
}

export function Status(props: Props) {
	const { isActive, type } = props;

	const statusButtonVariant = useMemo(() => {
		return isActive ? 'secondary' : 'destructive';
	}, [isActive]);

	const statusButtonText = useMemo(() => {
		return isActive ? 'Active' : 'Inactive';
	}, [isActive]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{type} Status</CardTitle>
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
