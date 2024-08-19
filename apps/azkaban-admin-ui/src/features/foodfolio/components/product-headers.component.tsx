import { TableHeader, TableRow, TableHead } from '../../shared';

export function ProductHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Title</TableHead>
				<TableHead>Current Stock</TableHead>
				<TableHead>Min Stock</TableHead>
				<TableHead>Max Stock</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Created At</TableHead>
				<TableHead />
			</TableRow>
		</TableHeader>
	);
}
