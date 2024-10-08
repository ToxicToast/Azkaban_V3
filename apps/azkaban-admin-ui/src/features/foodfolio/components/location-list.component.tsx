import { FoodFolioLocation } from '@toxictoast/azkaban-sdk';
import { useMemo } from 'react';
import {
	getStatusText,
	getStatusVariant,
	PrettyDates,
} from '../../shared/helpers';
import { Badge, TableCell, TableRow } from '../../shared';
import { Actions } from '../../shared/components/components/actions.component';
import { Nullable } from '@toxictoast/azkaban-base-types';

interface Props {
	location: FoodFolioLocation;
	onView: () => void;
	parent: Nullable<FoodFolioLocation>;
}

export function LocationList(props: Props) {
	const { location, onView, parent } = props;

	const getLocationStatus = useMemo(() => {
		return getStatusText(location.isDeleted, false, location.isActive);
	}, [location.isActive, location.isDeleted]);

	const getLocationStatusVariant = useMemo(() => {
		return getStatusVariant(location.isDeleted, false, location.isActive);
	}, [location.isActive, location.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{location.title}</TableCell>
			<TableCell>{parent === null ? '' : parent?.title}</TableCell>
			<TableCell>
				<Badge variant={getLocationStatusVariant}>
					{getLocationStatus}
				</Badge>
			</TableCell>
			<TableCell>{PrettyDates(location.created_at)}</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit location')}
					onDelete={() => console.error('on delete location')}
					onRestore={() => console.error('on restore location')}
					isDeleted={location.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
