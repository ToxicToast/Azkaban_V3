import { useProductState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { foodfolioProductRoute } from '../../../../config/routes';
import { Link } from 'react-router-dom';

export function StatsProducts() {
	const { productCount } = useProductState();

	return (
		<Link to={foodfolioProductRoute}>
			<Stats
				title="Total Foodfolio Products"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(productCount)}
			/>
		</Link>
	);
}
