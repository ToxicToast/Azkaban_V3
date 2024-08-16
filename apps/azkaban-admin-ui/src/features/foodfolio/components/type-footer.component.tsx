import { TableCell, TableFooter, TableRow } from '../../shared';

export function TypeFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={4}>No Types found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
