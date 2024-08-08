import { useMemo } from 'react';
import {
	foodfolioSizeRoute,
	foodfolioSizeViewRoute,
} from '../../../../config/routes';
import { useSizeState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function LatestSize() {
	const { sizeLatest, selectSizeId } = useSizeState();

	const getSizeId = useMemo(() => {
		return sizeLatest?.id ?? '0';
	}, [sizeLatest?.id]);

	const getSizeName = useMemo(() => {
		return sizeLatest?.title ?? 'No Size :(';
	}, [sizeLatest?.title]);

	const getSizeLink = useMemo(() => {
		const sizeId = sizeLatest?.id ?? null;
		if (sizeId !== null) {
			return foodfolioSizeViewRoute.replace(':id', sizeId);
		}
		return foodfolioSizeRoute;
	}, [sizeLatest?.id]);

	return (
		<Link to={getSizeLink} onClick={() => selectSizeId(getSizeId)}>
			<Stats
				title="Latest FoodFolio Size"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getSizeName}
			/>
		</Link>
	);
}
