import { Button } from '../ui';
import { EditIcon, SearchIcon, TrashIcon } from 'lucide-react';

interface Props {
	onView: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

export function Actions(props: Props) {
	const { onView, onEdit, onDelete } = props;

	return (
		<>
			<Button onClick={() => onView()} size="sm">
				<SearchIcon className="h-3.5 w-3.5" />
			</Button>
			&nbsp;
			<Button onClick={() => onEdit()} size="sm" variant="secondary">
				<EditIcon className="h-3.5 w-3.5" />
			</Button>
			&nbsp;
			<Button onClick={() => onDelete()} size="sm" variant="destructive">
				<TrashIcon className="h-3.5 w-3.5" />
			</Button>
		</>
	);
}
