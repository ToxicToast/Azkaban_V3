import { TableHeader, TableRow, TableHead } from '../../shared';

export function WarehouseHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Title</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Created At</TableHead>
				<TableHead />
			</TableRow>
		</TableHeader>
	);
}
