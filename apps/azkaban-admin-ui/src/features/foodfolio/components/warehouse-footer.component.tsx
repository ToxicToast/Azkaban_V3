import { TableCell, TableFooter, TableRow } from '../../shared';

export function WarehouseFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={4}>No Warehouses found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
