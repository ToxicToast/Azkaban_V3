import { Show } from '../../../../widgets';
import { SidebarLink } from './link';
import { Cuboid } from 'lucide-react';

interface Props {
	canSee: boolean;
}

export function SidebarCoworking(props: Props) {
	const { canSee } = props;

	return (
		<Show show={canSee}>
			<SidebarLink
				title="Task List"
				path="/co-working/task-list"
				icon={<Cuboid className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
		</Show>
	);
}
