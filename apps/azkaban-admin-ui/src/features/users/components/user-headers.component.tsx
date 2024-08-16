import { TableHeader, TableRow, TableHead } from '../../shared';

export function UserHeaders() {
	return (
		<TableHeader className="w-full">
			<TableRow>
				<TableHead>Username</TableHead>
				<TableHead>Email</TableHead>
				<TableHead>Status</TableHead>
				<TableHead>Created At</TableHead>
				<TableHead>Last Login</TableHead>
				<TableHead className="text-center">Groups</TableHead>
				<TableHead />
			</TableRow>
		</TableHeader>
	);
}
