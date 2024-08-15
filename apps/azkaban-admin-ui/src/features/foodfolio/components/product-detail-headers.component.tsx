import { TableHeader, TableRow, TableHead } from '../../shared';

export function ProductDetailHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Title</TableHead>
				<TableHead>Purchased At</TableHead>
				<TableHead>Expire At</TableHead>
				<TableHead>Opened At</TableHead>
				<TableHead>Returnable</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Created At</TableHead>
				<TableHead />
			</TableRow>
		</TableHeader>
	);
}
