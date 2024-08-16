import { foodfolioCategoryRoute } from '../../../../config/routes';
import { useCategoryState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function StatsCategory() {
	const { categoryCount } = useCategoryState();

	return (
		<Link to={foodfolioCategoryRoute}>
			<Stats
				title="Total Foodfolio Categories"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(categoryCount)}
			/>
		</Link>
	);
}
