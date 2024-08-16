import { Show } from '../../../../widgets';
import { Badge } from '../../../ui';

interface Props {
	canNotSee: boolean;
}

export function SidebarNoPermission(props: Props) {
	const { canNotSee } = props;

	return (
		<Show show={canNotSee}>
			<div className="center flex flex-col items-center">
				<Badge variant="destructive">No Permission</Badge>
			</div>
		</Show>
	);
}
