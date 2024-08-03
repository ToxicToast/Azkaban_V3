import { Stats } from '../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useCategoryState } from '../../shared/store/foodfolio';

export function FoodfolioStats() {
	const { categoryCount } = useCategoryState();

	return (
		<>
			<Link to={`/foodfolio/category`}>
				<Stats
					title="Total Foodfolio Categories"
					icon={
						<CubeIcon className="h-4 w-4 text-muted-foreground" />
					}
					statistic={String(categoryCount)}
				/>
			</Link>

			<Stats
				title="Total Foodfolio Brands"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
			<Stats
				title="Total Foodfolio Products"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
			<Stats
				title="Total Foodfolio Locations"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
			<Stats
				title="Total Foodfolio Sizes"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
			<Stats
				title="Total Foodfolio Types"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
			<Stats
				title="Total Foodfolio Receipts"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
			<Stats
				title="Total Foodfolio Warehouses"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>
		</>
	);
}
