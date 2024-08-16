import { Show, Table, TableBody } from '../../shared';
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
import { WarehouseFooter } from '../components/warehouse-footer.component';

function WarehouseDashboardPage() {
	const { warehouseData, warehouseCount, selectWarehouseId } =
		useWarehouseState();
	const navigate = useNavigate();

	const onView = useCallback(
		(warehouseId: string) => {
			selectWarehouseId(warehouseId);
			navigate(foodfolioWarehouseViewRoute);
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
								key={warehouse.id}
								warehouse={warehouse}
								onView={() => onView(warehouse.id)}
							/>
						))}
					</TableBody>
					<Show show={warehouseCount === 0}>
						<WarehouseFooter />
					</Show>
				</Table>
			</div>
		</>
	);
}

export default WarehouseDashboardPage;
