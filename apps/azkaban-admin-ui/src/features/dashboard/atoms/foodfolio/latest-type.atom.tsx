import { useMemo } from 'react';
import {
	foodfolioTypeRoute,
	foodfolioTypeViewRoute,
} from '../../../../config/routes';
import { useTypeState } from '../../../shared/store/foodfolio';
import { Stats } from '../../components';
import { CubeIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

export function LatestType() {
	const { typeLatest, selectTypeId } = useTypeState();

	const getTypeId = useMemo(() => {
		return typeLatest?.id ?? '0';
	}, [typeLatest?.id]);

	const getTypeName = useMemo(() => {
		return typeLatest?.title ?? 'No Type :(';
	}, [typeLatest?.title]);

	const getTypeLink = useMemo(() => {
		const typeId = typeLatest?.id ?? null;
		if (typeId !== null) {
			return foodfolioTypeViewRoute;
		}
		return foodfolioTypeRoute;
	}, [typeLatest?.id]);

	return (
		<Link to={getTypeLink} onClick={() => selectTypeId(getTypeId)}>
			<Stats
				title="Latest FoodFolio Type"
				icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
				statistic={getTypeName}
			/>
		</Link>
	);
}
