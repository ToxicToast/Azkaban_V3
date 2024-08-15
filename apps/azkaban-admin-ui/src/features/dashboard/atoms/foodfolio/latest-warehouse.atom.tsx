import { useMemo } from 'react';
import {
	foodfolioWarehouseRoute,
	foodfolioWarehouseViewRoute,
} from '../../../../config/routes';
import { useWarehouseState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function LatestWarehouse() {
	const { warehouseLatest, selectWarehouseId } = useWarehouseState();

	const getWarehouseId = useMemo(() => {
		return warehouseLatest?.id ?? '0';
	}, [warehouseLatest?.id]);

	const getWarehouseName = useMemo(() => {
		return warehouseLatest?.title ?? 'No Warehouse :(';
	}, [warehouseLatest?.title]);

	const getWarehouseLink = useMemo(() => {
		const warehouseId = warehouseLatest?.id ?? null;
		if (warehouseId !== null) {
			return foodfolioWarehouseViewRoute;
		}
		return foodfolioWarehouseRoute;
	}, [warehouseLatest?.id]);

	return (
		<Link
			to={getWarehouseLink}
			onClick={() => selectWarehouseId(getWarehouseId)}
		>
			<Stats
				title="Latest FoodFolio Warehouse"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getWarehouseName}
			/>
		</Link>
	);
}
