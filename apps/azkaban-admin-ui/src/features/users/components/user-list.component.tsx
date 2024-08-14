import { User } from '@toxictoast/azkaban-sdk';
import { Badge, TableCell, TableRow } from '../../shared';
import {
	getStatusText,
	getStatusVariant,
	PrettyDateDistance,
	PrettyDates,
} from '../../shared/helpers';
import { useMemo } from 'react';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	user: User;
	onView: () => void;
	onEdit: () => void;
	onDelete: () => void;
}

export function UserList(props: Props) {
	const { user, onView, onEdit, onDelete } = props;

	const getUserStatus = useMemo(() => {
		return getStatusText(user.isDeleted, user.isBanned, user.isActive);
	}, [user.isActive, user.isBanned, user.isDeleted]);

	const getUserStatusVariant = useMemo(() => {
		return getStatusVariant(user.isDeleted, user.isBanned, user.isActive);
	}, [user.isActive, user.isBanned, user.isDeleted]);

	const getUserLastLogin = useMemo(() => {
		if (user.loggedin_at) {
			return PrettyDateDistance(user.loggedin_at);
		}
		return 'Never';
	}, [user.loggedin_at]);

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
				<Badge variant="outline">{getUserLastLogin}</Badge>
			</TableCell>
			<TableCell className="text-center">
				<Badge variant="outline">{user.groups.length}</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => onEdit()}
					onDelete={() => onDelete()}
					onRestore={() => console.error('on restore user')}
					isDeleted={user.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
