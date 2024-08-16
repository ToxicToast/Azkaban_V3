import { usersRoute } from '../../../../config/routes';
import { Stats } from '../../components';
import { Link } from 'react-router-dom';
import { useUserState } from '../../../shared/store/user/user.hook';
import { Users } from 'lucide-react';

export function StatsUser() {
	const { dataCount } = useUserState();

	return (
		<Link to={usersRoute}>
			<Stats
				title="Total Azkaban Users"
				icon={<Users className="h-4 w-4 text-muted-foreground" />}
				statistic={String(dataCount)}
			/>
		</Link>
	);
}
