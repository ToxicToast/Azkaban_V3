import { FoodFolioWarehouse } from '@toxictoast/azkaban-sdk';
import { useMemo } from 'react';
import {
	getStatusText,
	getStatusVariant,
	PrettyDates,
} from '../../shared/helpers';
import { Badge, TableCell, TableRow } from '../../shared';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	warehouse: FoodFolioWarehouse;
	onView: () => void;
}

export function WarehouseList(props: Props) {
	const { warehouse, onView } = props;

	const getWarehouseStatus = useMemo(() => {
		return getStatusText(warehouse.isDeleted, false, warehouse.isActive);
	}, [warehouse.isActive, warehouse.isDeleted]);

	const getWarehouseStatusVariant = useMemo(() => {
		return getStatusVariant(warehouse.isDeleted, false, warehouse.isActive);
	}, [warehouse.isActive, warehouse.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{warehouse.title}</TableCell>
			<TableCell>
				<Badge variant={getWarehouseStatusVariant}>
					{getWarehouseStatus}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">
					{PrettyDates(warehouse.created_at)}
				</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit warehouse')}
					onDelete={() => console.error('on delete warehouse')}
					onRestore={() => console.error('on restore warehouse')}
					isDeleted={warehouse.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
