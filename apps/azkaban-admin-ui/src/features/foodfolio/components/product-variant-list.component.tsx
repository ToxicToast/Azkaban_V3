import {
	FoodFolioCategory,
	FoodFolioCompany,
	FoodFolioItem,
	FoodFolioItemVariant,
	FoodFolioLocation,
	FoodFolioSize,
	FoodFolioType,
	FoodFolioWarehouse,
} from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { useMemo } from 'react';
import {
	getStatusText,
	getStatusVariant,
	PrettyDates,
} from '../../shared/helpers';
import { Badge, TableCell, TableRow } from '../../shared';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	variant: FoodFolioItemVariant;
	onView: () => void;
	product: Nullable<FoodFolioItem>;
	category: Nullable<FoodFolioCategory>;
	location: Nullable<FoodFolioLocation>;
	brand: Nullable<FoodFolioCompany>;
	size: Nullable<FoodFolioSize>;
	type: Nullable<FoodFolioType>;
	warehouse: Nullable<FoodFolioWarehouse>;
}

export function ProductVariantList(props: Props) {
	const {
		variant,
		onView,
		product,
		category,
		location,
		brand,
		size,
		type,
		warehouse,
	} = props;

	const getProductVariantStatus = useMemo(() => {
		return getStatusText(variant.isDeleted, false, variant.isActive);
	}, [variant.isActive, variant.isDeleted]);

	const getProductVariantStatusVariant = useMemo(() => {
		return getStatusVariant(variant.isDeleted, false, variant.isActive);
	}, [variant.isActive, variant.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{variant.title}</TableCell>
			<TableCell>
				{product === null ? 'No Product' : product?.title}
			</TableCell>
			<TableCell>
				{category === null ? 'No Category' : category?.title}
			</TableCell>
			<TableCell>
				{location === null ? 'No Location' : location?.title}
			</TableCell>
			<TableCell>{brand === null ? 'No Brand' : brand?.title}</TableCell>
			<TableCell>{size === null ? 'No Size' : size?.title}</TableCell>
			<TableCell>{type === null ? 'No Type' : type?.title}</TableCell>
			<TableCell>
				<Badge variant={warehouse === null ? 'secondary' : 'outline'}>
					{warehouse === null ? 'No Warehouse' : warehouse?.title}
				</Badge>
			</TableCell>
			<TableCell>{variant?.sku}</TableCell>
			<TableCell>
				<Badge variant={getProductVariantStatusVariant}>
					{getProductVariantStatus}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">
					{PrettyDates(variant.created_at)}
				</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit product variant')}
					onDelete={() => console.error('on delete product variant')}
					onRestore={() =>
						console.error('on restore product variant')
					}
					isDeleted={variant.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
