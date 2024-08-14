import { LatestCategory } from '../atoms/foodfolio/latest-category.atom';
import { LatestBrand } from '../atoms/foodfolio/latest-brand.atom';
import { LatestLocation } from '../atoms/foodfolio/latest-location.atom';
import { LatestSize } from '../atoms/foodfolio/latest-size.atom';
import { LatestType } from '../atoms/foodfolio/latest-type.atom';
import { LatestWarehouse } from '../atoms/foodfolio/latest-warehouse.atom';

export function FoodFolioLatest() {
	return (
		<>
			<LatestCategory />
			<LatestBrand />
			<div>{/* TODO: LATEST PRODUCT */}</div>
			<div>{/* TODO: LATEST PRODUCT DETAIL */}</div>
			<LatestLocation />
			<LatestSize />
			<LatestType />
			<div>{/* TODO: LATEST RECEIPT */}</div>
			<LatestWarehouse />
		</>
	);
}
