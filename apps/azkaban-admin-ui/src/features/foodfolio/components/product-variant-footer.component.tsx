import { TableCell, TableFooter, TableRow } from '../../shared';

export function ProductVariantFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={12}>No Product Variants found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
