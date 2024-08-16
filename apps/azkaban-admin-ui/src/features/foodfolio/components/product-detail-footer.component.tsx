import { TableCell, TableFooter, TableRow } from '../../shared';

export function ProductDetailFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={7}>No Product Details found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
