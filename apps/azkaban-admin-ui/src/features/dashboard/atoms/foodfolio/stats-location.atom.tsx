import { foodfolioLocationRoute } from '../../../../config/routes';
import { useLocationState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function StatsLocation() {
	const { locationCount } = useLocationState();

	return (
		<Link to={foodfolioLocationRoute}>
			<Stats
				title="Total Foodfolio Locations"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(locationCount)}
			/>
		</Link>
	);
}
