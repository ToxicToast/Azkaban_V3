import { LatestCategory } from '../atoms/foodfolio/latest-category.atom';
import { LatestBrand } from '../atoms/foodfolio/latest-brand.atom';
import { LatestLocation } from '../atoms/foodfolio/latest-location.atom';
import { LatestSize } from '../atoms/foodfolio/latest-size.atom';
import { LatestType } from '../atoms/foodfolio/latest-type.atom';
import { LatestWarehouse } from '../atoms/foodfolio/latest-warehouse.atom';
import { LatestProduct } from '../atoms/foodfolio/latest-product.atom';
import { LatestProductDetail } from '../atoms/foodfolio/latest-product-detail.atom';
import { LatestReceipt } from '../atoms/foodfolio/latest-receipt.atom';
import { LatestProductVariant } from '../atoms/foodfolio/latest-product-variant.atom';

export function FoodFolioLatest() {
	return (
		<>
			<LatestCategory />
			<LatestBrand />
			<LatestProduct />
			<LatestProductVariant />
			<LatestProductDetail />
			<LatestLocation />
			<LatestSize />
			<LatestType />
			<LatestReceipt />
			<LatestWarehouse />
		</>
	);
}
