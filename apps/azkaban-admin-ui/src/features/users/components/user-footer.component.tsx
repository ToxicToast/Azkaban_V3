import { TableCell, TableFooter, TableRow } from '../../shared';

export function UserFooter() {
	return (
		<TableFooter className="w-full">
			<TableRow>
				<TableCell colSpan={7}>No Users found</TableCell>
			</TableRow>
		</TableFooter>
	);
}
