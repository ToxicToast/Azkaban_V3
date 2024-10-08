import { FoodFolioCompany } from '@toxictoast/azkaban-sdk';
import { useMemo } from 'react';
import { Badge, TableCell, TableRow } from '../../shared';
import {
	getStatusText,
	getStatusVariant,
	PrettyDates,
} from '../../shared/helpers';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	brand: FoodFolioCompany;
	onView: () => void;
}

export function BrandList(props: Props) {
	const { brand, onView } = props;

	const getBrandStatus = useMemo(() => {
		return getStatusText(brand.isDeleted, false, brand.isActive);
	}, [brand.isActive, brand.isDeleted]);

	const getBrandStatusVariant = useMemo(() => {
		return getStatusVariant(brand.isDeleted, false, brand.isActive);
	}, [brand.isActive, brand.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{brand.title}</TableCell>
			<TableCell>
				<Badge variant={getBrandStatusVariant}>{getBrandStatus}</Badge>
			</TableCell>
			<TableCell>{PrettyDates(brand.created_at)}</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit brand')}
					onDelete={() => console.error('on delete brand')}
					onRestore={() => console.error('on restore brand')}
					isDeleted={brand.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
