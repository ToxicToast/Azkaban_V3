import { useUserState } from '../../shared/store/user/user.hook';
import { Debugger } from '../../shared';

function UserDashboardPage() {
	const { data } = useUserState();

	return <Debugger data={data} />;
}

export default UserDashboardPage;
