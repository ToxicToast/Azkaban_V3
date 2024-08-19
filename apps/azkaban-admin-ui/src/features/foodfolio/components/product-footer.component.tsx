import { TableCell, TableFooter, TableRow } from '../../shared';

export function ProductFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={7}>No Products found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
