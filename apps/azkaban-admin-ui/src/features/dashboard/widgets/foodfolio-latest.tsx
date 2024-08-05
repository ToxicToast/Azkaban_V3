import { Stats } from '../components';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { CubeIcon } from '@radix-ui/react-icons';
import { useBrandState, useCategoryState } from '../../shared/store/foodfolio';
import {
	foodfolioBrandRoute,
	foodfolioBrandViewRoute,
	foodfolioCategoryRoute,
	foodfolioCategoryViewRoute,
} from '../../../config/routes';

export function FoodFolioLatest() {
	const { categoryLatest, selectCategoryId } = useCategoryState();
	const { brandLatest, selectBrandId } = useBrandState();

	const getCategoryId = useMemo(() => {
		return categoryLatest?.id ?? '0';
	}, [categoryLatest?.id]);

	const getCategoryName = useMemo(() => {
		return categoryLatest?.title ?? 'No Category :(';
	}, [categoryLatest?.title]);

	const getCategoryLink = useMemo(() => {
		const categoryId = categoryLatest?.id ?? null;
		if (categoryId !== null) {
			return foodfolioCategoryViewRoute.replace(':id', categoryId);
		}
		return foodfolioCategoryRoute;
	}, [categoryLatest?.id]);

	const getBrandId = useMemo(() => {
		return brandLatest?.id ?? '0';
	}, [brandLatest?.id]);

	const getBrandName = useMemo(() => {
		return brandLatest?.title ?? 'No Brand :(';
	}, [brandLatest?.title]);

	const getBrandLink = useMemo(() => {
		const brandId = brandLatest?.id ?? null;
		if (brandId !== null) {
			return foodfolioBrandViewRoute.replace(':id', brandId);
		}
		return foodfolioBrandRoute;
	}, [brandLatest?.id]);

	return (
		<>
			<Link
				to={getCategoryLink}
				onClick={() => selectCategoryId(getCategoryId)}
			>
				<Stats
					title="Latest FoodFolio Category"
					icon={
						<CubeIcon className="h-4 w-4 text-muted-foreground" />
					}
					statistic={getCategoryName}
				/>
			</Link>

			<Link to={getBrandLink} onClick={() => selectBrandId(getBrandId)}>
				<Stats
					title="Latest FoodFolio Brand"
					icon={
						<CubeIcon className="h-4 w-4 text-muted-foreground" />
					}
					statistic={getBrandName}
				/>
			</Link>
		</>
	);
}
