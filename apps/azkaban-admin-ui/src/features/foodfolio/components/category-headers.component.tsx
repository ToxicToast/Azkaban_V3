import { TableHeader, TableRow, TableHead } from '../../shared';

export function CategoryHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Title</TableHead>
				<TableHead>Root Category</TableHead>
				<TableHead>Status</TableHead>
				<TableHead />
			</TableRow>
		</TableHeader>
	);
}
