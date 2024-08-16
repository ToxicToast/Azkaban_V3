import { Stats } from '../../components';
import { useProductVariantState } from '../../../shared/store/foodfolio';
import { useMemo } from 'react';
import {
	foodfolioProductVariantRoute,
	foodfolioProductVariantViewRoute,
} from '../../../../config/routes';
import { Link } from 'react-router-dom';
import { CubeIcon } from '@radix-ui/react-icons';

export function LatestProductVariant() {
	const { productVariantLatest, selectProductVariantId } =
		useProductVariantState();

	const getProductVariantId = useMemo(() => {
		return productVariantLatest?.id ?? '0';
	}, [productVariantLatest?.id]);

	const getProductVariantName = useMemo(() => {
		return productVariantLatest?.title ?? 'No Product Variant :(';
	}, [productVariantLatest?.title]);

	const getProductVariantLink = useMemo(() => {
		const id = productVariantLatest?.id ?? null;
		if (id !== null) {
			return foodfolioProductVariantViewRoute;
		}
		return foodfolioProductVariantRoute;
	}, [productVariantLatest?.id]);

	return (
		<Link
			to={getProductVariantLink}
			onClick={() => selectProductVariantId(getProductVariantId)}
		>
			<Stats
				title="Latest FoodFolio Product Variant"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getProductVariantName}
			/>
		</Link>
	);
}
