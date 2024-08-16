import { TableCell, TableFooter, TableRow } from '../../shared';

export function SizeFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={11}>No Sizes found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
