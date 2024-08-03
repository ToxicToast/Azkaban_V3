import { Debugger } from '../../shared';

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
			<Debugger data={groups} />
		</div>
	);
}
