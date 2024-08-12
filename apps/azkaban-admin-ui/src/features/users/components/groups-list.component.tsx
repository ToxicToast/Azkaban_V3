import { GroupsItem } from './groups-item.component';

interface Props {
	groups: Array<{
		id: string;
		group_id: string;
		user_id: string;
		title: string;
	}>;
}

export function GroupsList(props: Props) {
	const { groups } = props;

	return (
		<div className="grid gap-6">
			<div className="grid grid-cols-3 items-center gap-3">
				{groups.map((group) => (
					<GroupsItem key={group.id} group={group} />
				))}
			</div>
		</div>
	);
}
