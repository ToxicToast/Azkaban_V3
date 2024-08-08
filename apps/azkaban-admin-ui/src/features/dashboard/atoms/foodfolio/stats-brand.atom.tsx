import { foodfolioBrandRoute } from '../../../../config/routes';
import { useBrandState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function StatsBrand() {
	const { brandCount } = useBrandState();

	return (
		<Link to={foodfolioBrandRoute}>
			<Stats
				title="Total Foodfolio Brands"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(brandCount)}
			/>
		</Link>
	);
}
