import { Stats } from '../components';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { CubeIcon } from '@radix-ui/react-icons';
import { useCategoryState } from '../../shared/store/foodfolio';

export function FoodFolioLatest() {
	const { categoryLatest, selectCategoryId } = useCategoryState();

	const getCategoryId = useMemo(() => {
		return categoryLatest?.id ?? '0';
	}, [categoryLatest?.id]);

	const getCategoryName = useMemo(() => {
		return categoryLatest?.title ?? 'No Category :(';
	}, [categoryLatest?.title]);

	return (
		<Link
			to={`/foodfolio/category/view/${getCategoryId}`}
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
