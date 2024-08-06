import { TableHeader, TableRow, TableHead } from '../../shared';

export function LocationHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Title</TableHead>
				<TableHead>Root Category</TableHead>
				<TableHead>Freezer</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Created At</TableHead>
				<TableHead />
			</TableRow>
		</TableHeader>
	);
}
