import { Card, CardHeader, CardTitle } from '../../shared';
import { CircleFadingPlus } from 'lucide-react';

export function AddGroups() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<CircleFadingPlus />
				</CardTitle>
			</CardHeader>
		</Card>
	);
}
