import { foodfolioSizeRoute } from '../../../../config/routes';
import { useSizeState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function StatsSize() {
	const { sizeCount } = useSizeState();

	return (
		<Link to={foodfolioSizeRoute}>
			<Stats
				title="Total Foodfolio Sizes"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(sizeCount)}
			/>
		</Link>
	);
}
