import { Stats } from '../../components';
import { useProductState } from '../../../shared/store/foodfolio';
import { useMemo } from 'react';
import {
	foodfolioProductRoute,
	foodfolioProductViewRoute,
} from '../../../../config/routes';
import { Link } from 'react-router-dom';
import { CubeIcon } from '@radix-ui/react-icons';

export function LatestProduct() {
	const { productLatest, selectProductId } = useProductState();

	const getProductId = useMemo(() => {
		return productLatest?.id ?? '0';
	}, [productLatest?.id]);

	const getProductName = useMemo(() => {
		return productLatest?.title ?? 'No Product :(';
	}, [productLatest?.title]);

	const getProductLink = useMemo(() => {
		const sizeId = productLatest?.id ?? null;
		if (sizeId !== null) {
			return foodfolioProductViewRoute;
		}
		return foodfolioProductRoute;
	}, [productLatest?.id]);

	return (
		<Link to={getProductLink} onClick={() => selectProductId(getProductId)}>
			<Stats
				title="Latest FoodFolio Product"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getProductName}
			/>
		</Link>
	);
}
