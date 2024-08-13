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

			<div>{/* TODO: TOTAL PRODUCTS */}</div>
			<div>{/* TODO: TOTAL PRODUCT DETAILS */}</div>

			<StatsLocation />
			<StatsSize />
			<StatsType />

			<div>{/* TODO: TOTAL RECEIPTS */}</div>
			<div>{/* TODO: TOTAL WAREHOUSES */}</div>
		</>
	);
}
