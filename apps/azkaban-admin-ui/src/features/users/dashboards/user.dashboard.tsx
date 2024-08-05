import { useUserState } from '../../shared/store/user/user.hook';
import { Table } from '../../shared';
import { UserHeaders } from '../components/user-headers.component';
import { UserList } from '../components/user-list.component';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { viewUsersRoute } from '../../../config/routes';

function UserDashboardPage() {
	const { data, selectUserId } = useUserState();
	const navigate = useNavigate();

	const onView = useCallback(
		(userId: string) => {
			selectUserId(userId);
			navigate(viewUsersRoute.replace(':id', userId));
		},
		[navigate, selectUserId],
	);

	return (
		<>
			<div className="flex flex-col space-y-1.5 p-6 px-7">
				<h3 className="font-semibold leading-none tracking-tight">
					Users
				</h3>
				<p className="text-sm text-muted-foreground">
					All registered Users in Azkaban.
				</p>
			</div>
			<div className="p-6 pt-0">
				<Table>
					<UserHeaders />
					{data.map((user) => (
						<UserList
							user={user}
							key={user.id}
							onView={() => onView(user.id)}
						/>
					))}
				</Table>
			</div>
		</>
	);
}

export default UserDashboardPage;
