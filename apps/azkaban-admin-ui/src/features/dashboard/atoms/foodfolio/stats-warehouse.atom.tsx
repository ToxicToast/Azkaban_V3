import { foodfolioWarehouseRoute } from '../../../../config/routes';
import { useWarehouseState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function StatsWarehouse() {
	const { warehouseCount } = useWarehouseState();

	return (
		<Link to={foodfolioWarehouseRoute}>
			<Stats
				title="Total Foodfolio Warehouses"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(warehouseCount)}
			/>
		</Link>
	);
}
