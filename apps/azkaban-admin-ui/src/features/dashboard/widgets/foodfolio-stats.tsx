import { Stats } from '../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { StatsCategory } from '../atoms/foodfolio/stats-category.atom';
import { StatsBrand } from '../atoms/foodfolio/stats-brand.atom';
import { StatsLocation } from '../atoms/foodfolio/stats-location.atom';
import { StatsSize } from '../atoms/foodfolio/stats-size.atom';
import { StatsType } from '../atoms/foodfolio/stats-type.atom';

export function FoodfolioStats() {
	return (
		<>
			<StatsCategory />
			<StatsBrand />

			<Stats
				title="Total Foodfolio Products"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="Not Available"
			/>

			<StatsLocation />
			<StatsSize />
			<StatsType />

			<Stats
				title="Total Foodfolio Receipts"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="Not Available"
			/>
			<Stats
				title="Total Foodfolio Warehouses"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic="Not Available"
			/>
		</>
	);
}
