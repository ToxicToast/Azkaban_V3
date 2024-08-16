import { Card, CardHeader, CardTitle } from '../../shared';

interface Props {
	group: {
		id: string;
		group_id: string;
		user_id: string;
		title: string;
	};
}

export function GroupsItem(props: Props) {
	const { group } = props;

	return (
		<Card className="duration-200 ease-in-out hover:bg-accent">
			<CardHeader>
				<CardTitle>{group.title}</CardTitle>
			</CardHeader>
		</Card>
	);
}
