import { User } from '@toxictoast/azkaban-sdk';
import { Badge, Button, TableBody, TableCell, TableRow } from '../../shared';

interface Props {
	user: User;
	onView: () => void;
}

export function UserList(props: Props) {
	const { user, onView } = props;

	return (
		<TableBody>
			<TableRow>
				<TableCell className="font-medium">{user.username}</TableCell>
				<TableCell>{user.email}</TableCell>
				<TableCell>
					<Badge variant={user.isActive ? 'outline' : 'destructive'}>
						{user.isActive ? 'Active' : 'Inactive'}
					</Badge>
				</TableCell>
				<TableCell>
					<Badge variant={user.isDeleted ? 'destructive' : 'outline'}>
						{user.isDeleted ? 'Deleted' : 'Not Deleted'}
					</Badge>
				</TableCell>
				<TableCell>
					<Badge variant={user.isBanned ? 'destructive' : 'outline'}>
						{user.isBanned ? 'Banned' : 'Not Banned'}
					</Badge>
				</TableCell>
				<TableCell className="text-center">
					<Badge variant="outline">{user.groups.length}</Badge>
				</TableCell>
				<TableCell>
					<Button onClick={() => onView()}>View</Button>
				</TableCell>
			</TableRow>
		</TableBody>
	);
}
