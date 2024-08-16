import { TableCell, TableFooter, TableRow } from '../../shared';

export function BrandFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={4}>No Brands found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
