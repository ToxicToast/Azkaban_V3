import { Button, Card, CardContent, CardHeader, CardTitle } from '../ui';

interface Props {
	isDeleted: boolean;
	type: string;
}

export function Archive(props: Props) {
	const { isDeleted, type } = props;

	return (
		<Card hidden={isDeleted}>
			<CardHeader>
				<CardTitle>Archive {type}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<Button variant="secondary">Archive</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
