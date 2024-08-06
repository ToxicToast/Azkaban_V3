import { Stats } from '../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import {
	useBrandState,
	useCategoryState,
	useLocationState,
} from '../../shared/store/foodfolio';
import {
	foodfolioBrandRoute,
	foodfolioCategoryRoute,
	foodfolioLocationRoute,
} from '../../../config/routes';

export function FoodfolioStats() {
	const { categoryCount } = useCategoryState();
	const { brandCount } = useBrandState();
	const { locationCount } = useLocationState();

	return (
		<>
			<Link to={foodfolioCategoryRoute}>
				<Stats
					title="Total Foodfolio Categories"
					icon={
						<CubeIcon className="h-4 w-4 text-muted-foreground" />
					}
					statistic={String(categoryCount)}
				/>
			</Link>

			<Link to={foodfolioBrandRoute}>
				<Stats
					title="Total Foodfolio Brands"
					icon={
						<CubeIcon className="h-4 w-4 text-muted-foreground" />
					}
					statistic={String(brandCount)}
				/>
			</Link>

			<Stats
				title="Total Foodfolio Products"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="0"
			/>

			<Link to={foodfolioLocationRoute}>
				<Stats
					title="Total Foodfolio Locations"
					icon={
						<CubeIcon className="h-4 w-4 text-muted-foreground" />
					}
					statistic={String(locationCount)}
				/>
			</Link>

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
