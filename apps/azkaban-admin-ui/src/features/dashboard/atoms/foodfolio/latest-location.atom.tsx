import { useMemo } from 'react';
import {
	foodfolioLocationRoute,
	foodfolioLocationViewRoute,
} from '../../../../config/routes';
import { useLocationState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function LatestLocation() {
	const { locationLatest, selectLocationId } = useLocationState();

	const getLocationId = useMemo(() => {
		return locationLatest?.id ?? '0';
	}, [locationLatest?.id]);

	const getLocationName = useMemo(() => {
		return locationLatest?.title ?? 'No Location :(';
	}, [locationLatest?.title]);

	const getLocationLink = useMemo(() => {
		const locationId = locationLatest?.id ?? null;
		if (locationId !== null) {
			return foodfolioLocationViewRoute.replace(':id', locationId);
		}
		return foodfolioLocationRoute;
	}, [locationLatest?.id]);

	return (
		<Link
			to={getLocationLink}
			onClick={() => selectLocationId(getLocationId)}
		>
			<Stats
				title="Latest FoodFolio Location"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getLocationName}
			/>
		</Link>
	);
}
