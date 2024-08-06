import { FoodFolioLocation } from '@toxictoast/azkaban-sdk';
import { useMemo } from 'react';
import {
	getStatusText,
	getStatusVariant,
	PrettyDates,
} from '../../shared/helpers';
import { Badge, TableCell, TableRow } from '../../shared';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	location: FoodFolioLocation;
	onView: () => void;
}

export function LocationList(props: Props) {
	const { location, onView } = props;

	const getLocationStatus = useMemo(() => {
		return getStatusText(location.isDeleted, false, location.isActive);
	}, [location.isActive, location.isDeleted]);

	const getLocationStatusVariant = useMemo(() => {
		return getStatusVariant(location.isDeleted, false, location.isActive);
	}, [location.isActive, location.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{location.title}</TableCell>
			<TableCell>
				<Badge variant="outline">
					{location.isParent ? 'Root' : 'Not Root'}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={getLocationStatusVariant}>
					{getLocationStatus}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">
					{PrettyDates(location.created_at)}
				</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit category')}
					onDelete={() => console.error('on delete category')}
				/>
			</TableCell>
		</TableRow>
	);
}
