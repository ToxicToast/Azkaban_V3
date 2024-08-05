import { TableHeader, TableRow, TableHead } from '../../shared';

export function UserHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Username</TableHead>
				<TableHead>Email</TableHead>
				<TableHead>Active</TableHead>
				<TableHead>Deleted</TableHead>
				<TableHead>Banned</TableHead>
				<TableHead className="text-center">Groups</TableHead>
				<TableHead />
			</TableRow>
		</TableHeader>
	);
}
