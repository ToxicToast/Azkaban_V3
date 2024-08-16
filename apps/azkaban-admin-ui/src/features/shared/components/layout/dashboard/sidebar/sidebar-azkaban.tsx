import { SidebarLink } from './link';
import {
	deleteUsersRoute,
	editUsersRoute,
	groupsRoute,
	notificationsRoute,
	usersRoute,
	viewUsersRoute,
} from '../../../../../../config/routes';
import { Group, Notebook, User } from 'lucide-react';
import { Show } from '../../../../widgets';

interface Props {
	canSee: boolean;
}

export function SidebarAzkaban(props: Props) {
	const { canSee } = props;

	return (
		<Show show={canSee}>
			<SidebarLink
				title="Users"
				path={usersRoute}
				icon={<User className="h-4 w-4 shrink-0" />}
				otherPaths={[viewUsersRoute, deleteUsersRoute, editUsersRoute]}
			/>

			<SidebarLink
				title="Groups"
				path={groupsRoute}
				icon={<Group className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>

			<SidebarLink
				title="Notifications"
				path={notificationsRoute}
				icon={<Notebook className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
		</Show>
	);
}
