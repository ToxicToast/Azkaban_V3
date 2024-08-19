import { TableHeader, TableRow, TableHead } from '../../shared';

export function ProductVariantHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Item</TableHead>
				<TableHead>Variant</TableHead>
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
