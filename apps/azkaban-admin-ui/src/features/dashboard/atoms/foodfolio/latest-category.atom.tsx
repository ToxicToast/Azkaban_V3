import { useMemo } from 'react';
import {
	foodfolioCategoryRoute,
	foodfolioCategoryViewRoute,
} from '../../../../config/routes';
import { useCategoryState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function LatestCategory() {
	const { categoryLatest, selectCategoryId } = useCategoryState();

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

	return (
		<Link
			to={getCategoryLink}
			onClick={() => selectCategoryId(getCategoryId)}
		>
			<Stats
				title="Latest FoodFolio Category"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getCategoryName}
			/>
		</Link>
	);
}
