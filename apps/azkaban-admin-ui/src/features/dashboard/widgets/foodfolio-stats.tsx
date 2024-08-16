import { StatsCategory } from '../atoms/foodfolio/stats-category.atom';
import { StatsBrand } from '../atoms/foodfolio/stats-brand.atom';
import { StatsLocation } from '../atoms/foodfolio/stats-location.atom';
import { StatsSize } from '../atoms/foodfolio/stats-size.atom';
import { StatsType } from '../atoms/foodfolio/stats-type.atom';
import { StatsWarehouse } from '../atoms/foodfolio/stats-warehouse.atom';
import { StatsProducts } from '../atoms/foodfolio/stats-products.atom';
import { StatsProductDetails } from '../atoms/foodfolio/stats-product-details.atom';
import { StatsReceipts } from '../atoms/foodfolio/stats-receipts.atom';

export function FoodfolioStats() {
	return (
		<>
			<StatsCategory />
			<StatsBrand />
			<StatsProducts />
			<StatsProductDetails />
			<StatsLocation />
			<StatsSize />
			<StatsType />
			<StatsReceipts />
			<StatsWarehouse />
		</>
	);
}
