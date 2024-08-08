import { LatestCategory } from '../atoms/foodfolio/latest-category.atom';
import { LatestBrand } from '../atoms/foodfolio/latest-brand.atom';
import { LatestLocation } from '../atoms/foodfolio/latest-location.atom';
import { LatestSize } from '../atoms/foodfolio/latest-size.atom';

export function FoodFolioLatest() {
	return (
		<>
			<LatestCategory />
			<LatestBrand />
			{/* TODO: LATEST PRODUCT */}
			<LatestLocation />
			<LatestSize />
			{/* TODO: LATEST TYPE */}
			{/* TODO: LATEST RECEIPT */}
			{/* TODO: LATEST WAREHOUSE */}
		</>
	);
}
