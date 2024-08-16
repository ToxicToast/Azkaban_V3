import { FoodFolioSize } from '@toxictoast/azkaban-sdk';
import { useMemo } from 'react';
import {
	getStatusText,
	getStatusVariant,
	PrettyDates,
} from '../../shared/helpers';
import { Badge, TableCell, TableRow } from '../../shared';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	size: FoodFolioSize;
	onView: () => void;
}

export function SizeList(props: Props) {
	const { size, onView } = props;

	const getSizeStatus = useMemo(() => {
		return getStatusText(size.isDeleted, false, size.isActive);
	}, [size.isActive, size.isDeleted]);

	const getSizeStatusVariant = useMemo(() => {
		return getStatusVariant(size.isDeleted, false, size.isActive);
	}, [size.isActive, size.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{size.title}</TableCell>
			<TableCell>
				<Badge variant={getSizeStatusVariant}>{getSizeStatus}</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">{PrettyDates(size.created_at)}</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit size')}
					onDelete={() => console.error('on delete size')}
					onRestore={() => console.error('on restore size')}
					isDeleted={size.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
