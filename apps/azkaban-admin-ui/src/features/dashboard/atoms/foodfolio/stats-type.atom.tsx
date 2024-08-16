import { foodfolioTypeRoute } from '../../../../config/routes';
import { useTypeState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function StatsType() {
	const { typeCount } = useTypeState();

	return (
		<Link to={foodfolioTypeRoute}>
			<Stats
				title="Total Foodfolio Types"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(typeCount)}
			/>
		</Link>
	);
}
