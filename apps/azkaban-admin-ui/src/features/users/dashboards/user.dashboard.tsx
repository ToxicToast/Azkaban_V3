import { useUserState } from '../../shared/store/user/user.hook';
import { Table } from '../../shared';
import { UserHeaders } from '../components/user-headers.component';
import { UserList } from '../components/user-list.component';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { viewUsersRoute } from '../../../config/routes';
import { PageTitle } from '../../shared/components/components/page-title.component';

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
			<PageTitle
				title="Users"
				description="All registered Users in Azkaban."
				type="User"
				onAdd={console.log}
			/>
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