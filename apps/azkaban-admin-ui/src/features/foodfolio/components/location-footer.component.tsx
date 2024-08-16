import { TableCell, TableFooter, TableRow } from '../../shared';

export function LocationFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={6}>No Locations found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
