import { FoodFolioType } from '@toxictoast/azkaban-sdk';
import { useMemo } from 'react';
import {
	getStatusText,
	getStatusVariant,
	PrettyDates,
} from '../../shared/helpers';
import { Badge, TableCell, TableRow } from '../../shared';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	type: FoodFolioType;
	onView: () => void;
}

export function TypeList(props: Props) {
	const { type, onView } = props;

	const getTypeStatus = useMemo(() => {
		return getStatusText(type.isDeleted, false, type.isActive);
	}, [type.isActive, type.isDeleted]);

	const getTypeStatusVariant = useMemo(() => {
		return getStatusVariant(type.isDeleted, false, type.isActive);
	}, [type.isActive, type.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{type.title}</TableCell>
			<TableCell>
				<Badge variant={getTypeStatusVariant}>{getTypeStatus}</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">{PrettyDates(type.created_at)}</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit type')}
					onDelete={() => console.error('on delete type')}
				/>
			</TableCell>
		</TableRow>
	);
}
