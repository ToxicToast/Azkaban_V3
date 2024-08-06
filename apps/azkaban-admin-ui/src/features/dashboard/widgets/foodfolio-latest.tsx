import { LatestCategory } from '../atoms/foodfolio/latest-category.atom';
import { LatestBrand } from '../atoms/foodfolio/latest-brand.atom';
import { LatestLocation } from '../atoms/foodfolio/latest-location.atom';

export function FoodFolioLatest() {
	return (
		<>
			<LatestCategory />
			<LatestBrand />
			<LatestLocation />
		</>
	);
}
