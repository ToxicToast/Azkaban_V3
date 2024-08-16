import { Button } from '../ui';
import {
	EditIcon,
	SearchIcon,
	TrashIcon,
	ArchiveRestoreIcon,
} from 'lucide-react';
import { Show } from '../../widgets';

interface Props {
	onView: () => void;
	onEdit: () => void;
	onDelete: () => void;
	onRestore: () => void;
	isDeleted: boolean;
}

export function Actions(props: Props) {
	const { onView, onEdit, onDelete, onRestore, isDeleted } = props;

	return (
		<>
			<Button onClick={() => onView()} size="sm">
				<SearchIcon className="h-3.5 w-3.5" />
			</Button>
			&nbsp;
			<Button
				onClick={() => onEdit()}
				size="sm"
				variant="secondary"
				disabled={true}
			>
				<EditIcon className="h-3.5 w-3.5" />
			</Button>
			&nbsp;
			<Show show={!isDeleted}>
				<Button
					onClick={() => onDelete()}
					size="sm"
					variant="destructive"
					disabled={true}
				>
					<TrashIcon className="h-3.5 w-3.5" />
				</Button>
			</Show>
			<Show show={isDeleted}>
				<Button
					onClick={() => onRestore()}
					size="sm"
					variant="outline"
					disabled={true}
				>
					<ArchiveRestoreIcon className="h-3.5 w-3.5" />
				</Button>
			</Show>
		</>
	);
}
