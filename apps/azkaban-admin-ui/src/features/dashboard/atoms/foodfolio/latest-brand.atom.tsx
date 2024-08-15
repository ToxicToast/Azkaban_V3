import { useMemo } from 'react';
import {
	foodfolioBrandRoute,
	foodfolioBrandViewRoute,
} from '../../../../config/routes';
import { useBrandState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function LatestBrand() {
	const { brandLatest, selectBrandId } = useBrandState();

	const getBrandId = useMemo(() => {
		return brandLatest?.id ?? '0';
	}, [brandLatest?.id]);

	const getBrandName = useMemo(() => {
		return brandLatest?.title ?? 'No Brand :(';
	}, [brandLatest?.title]);

	const getBrandLink = useMemo(() => {
		const brandId = brandLatest?.id ?? null;
		if (brandId !== null) {
			return foodfolioBrandViewRoute;
		}
		return foodfolioBrandRoute;
	}, [brandLatest?.id]);

	return (
		<Link to={getBrandLink} onClick={() => selectBrandId(getBrandId)}>
			<Stats
				title="Latest FoodFolio Brand"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getBrandName}
			/>
		</Link>
	);
}
