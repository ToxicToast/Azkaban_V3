import { TableHeader, TableRow, TableHead } from '../../shared';

export function ProductHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Title</TableHead>
				<TableHead>Category</TableHead>
				<TableHead>Location</TableHead>
				<TableHead>Brand</TableHead>
				<TableHead>Size</TableHead>
				<TableHead>Type</TableHead>
				<TableHead>Warehouse</TableHead>
				<TableHead>Stock</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Created At</TableHead>
				<TableHead />
			</TableRow>
		</TableHeader>
	);
}
