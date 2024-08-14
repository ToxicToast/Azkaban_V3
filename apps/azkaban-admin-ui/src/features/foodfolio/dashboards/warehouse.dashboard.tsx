import { Table, TableBody } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioWarehouseAddRoute,
	foodfolioWarehouseViewRoute,
} from '../../../config/routes';
import { useWarehouseState } from '../../shared/store/foodfolio/warehouse';
import { WarehouseHeaders } from '../components/warehouse-headers.component';
import { WarehouseList } from '../components/warehouse-list.component';

function WarehouseDashboardPage() {
	const { warehouseData, selectWarehouseId } = useWarehouseState();
	const navigate = useNavigate();

	const onView = useCallback(
		(warehouseId: string) => {
			selectWarehouseId(warehouseId);
			navigate(foodfolioWarehouseViewRoute.replace(':id', warehouseId));
		},
		[selectWarehouseId, navigate],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioWarehouseAddRoute);
	}, [navigate]);

	return (
		<>
			<PageTitle
				title="Warehouses"
				description="All Foodfolio Warehouses."
				type="Warehouse"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table>
					<WarehouseHeaders />
					<TableBody>
						{warehouseData.map((warehouse) => (
							<WarehouseList
								warehouse={warehouse}
								onView={() => onView(warehouse.id)}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

export default WarehouseDashboardPage;
