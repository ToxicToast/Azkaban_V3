import { Stats } from '../../components';
import {
	useProductDetailState,
	useProductState,
} from '../../../shared/store/foodfolio';
import { useMemo } from 'react';
import {
	foodfolioProductDetailRoute,
	foodfolioProductDetailViewRoute,
} from '../../../../config/routes';
import { Link } from 'react-router-dom';
import { CubeIcon } from '@radix-ui/react-icons';

export function LatestProductDetail() {
	const { productDetailLatest, selectProductDetailId } =
		useProductDetailState();
	const { productData } = useProductState();

	const getProductDetailId = useMemo(() => {
		return productDetailLatest?.id ?? '0';
	}, [productDetailLatest?.id]);

	const findProduct = useMemo(() => {
		const itemId = getProductDetailId;
		return productData.find((item) => item.id === itemId) ?? null;
	}, [getProductDetailId, productData]);

	const getProductDetailName = useMemo(() => {
		return findProduct?.title ?? 'No Product Detail :(';
	}, [findProduct?.title]);

	const getProductLink = useMemo(() => {
		const sizeId = productDetailLatest?.id ?? null;
		if (sizeId !== null) {
			return foodfolioProductDetailViewRoute;
		}
		return foodfolioProductDetailRoute;
	}, [productDetailLatest?.id]);

	return (
		<Link
			to={getProductLink}
			onClick={() => selectProductDetailId(getProductDetailId)}
		>
			<Stats
				title="Latest FoodFolio Product Detail"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getProductDetailName}
			/>
		</Link>
	);
}
