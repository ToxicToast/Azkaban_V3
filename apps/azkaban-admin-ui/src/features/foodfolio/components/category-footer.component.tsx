import { TableCell, TableFooter, TableRow } from '../../shared';

export function CategoryFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={5}>No Categories found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
