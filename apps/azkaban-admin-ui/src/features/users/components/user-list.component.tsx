import { User } from '@toxictoast/azkaban-sdk';
import { Badge, Button, TableCell, TableRow } from '../../shared';
import { PrettyDates } from '../../shared/helpers';
import { useMemo } from 'react';

interface Props {
	user: User;
	onView: () => void;
}

export function UserList(props: Props) {
	const { user, onView } = props;

	const getUserStatus = useMemo(() => {
		if (user.isDeleted) {
			return 'Deleted';
		} else if (user.isBanned) {
			return 'Banned';
		} else if (!user.isActive) {
			return 'Inactive';
		}
		return 'Active';
	}, [user.isActive, user.isBanned, user.isDeleted]);

	const getUserStatusVariant = useMemo(() => {
		if (user.isDeleted || user.isBanned) {
			return 'destructive';
		} else if (!user.isActive) {
			return 'outline';
		}
		return 'default';
	}, [user.isActive, user.isBanned, user.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{user.username}</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell>
				<Badge variant={getUserStatusVariant}>{getUserStatus}</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">{PrettyDates(user.created_at)}</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">LAST LOGIN</Badge>
			</TableCell>
			<TableCell className="text-center">
				<Badge variant="outline">{user.groups.length}</Badge>
			</TableCell>
			<TableCell>
				<Button onClick={() => onView()}>View</Button>
			</TableCell>
		</TableRow>
	);
}
