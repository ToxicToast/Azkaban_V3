import {
	FoodFolioCategory,
	FoodFolioCompany,
	FoodFolioItem,
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
	product: FoodFolioItem;
	onView: () => void;
	category: Nullable<FoodFolioCategory>;
	location: Nullable<FoodFolioLocation>;
	brand: Nullable<FoodFolioCompany>;
	size: Nullable<FoodFolioSize>;
	type: Nullable<FoodFolioType>;
	warehouse: Nullable<FoodFolioWarehouse>;
}

export function ProductList(props: Props) {
	const {
		product,
		onView,
		category,
		location,
		brand,
		size,
		type,
		warehouse,
	} = props;

	const getProductStatus = useMemo(() => {
		return getStatusText(product.isDeleted, false, product.isActive);
	}, [product.isActive, product.isDeleted]);

	const getProductStatusVariant = useMemo(() => {
		return getStatusVariant(product.isDeleted, false, product.isActive);
	}, [product.isActive, product.isDeleted]);

	const getProductSkuVariant = useMemo(() => {
		return getStatusVariant(
			product.min_sku > product.current_sku,
			false,
			true,
		);
	}, [product.current_sku, product.min_sku]);

	return (
		<TableRow>
			<TableCell className="font-medium">{product.title}</TableCell>
			<TableCell>
				<Badge variant={category === null ? 'secondary' : 'outline'}>
					{category === null ? 'No Category' : category?.title}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={location === null ? 'secondary' : 'outline'}>
					{location === null ? 'No Location' : location?.title}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={brand === null ? 'secondary' : 'outline'}>
					{brand === null ? 'No Brand' : brand?.title}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={size === null ? 'secondary' : 'outline'}>
					{size === null ? 'No Size' : size?.title}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={type === null ? 'secondary' : 'outline'}>
					{type === null ? 'No Type' : type?.title}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={warehouse === null ? 'secondary' : 'outline'}>
					{warehouse === null ? 'No Warehouse' : warehouse?.title}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={getProductSkuVariant}>
					{product?.current_sku}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={getProductStatusVariant}>
					{getProductStatus}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">
					{PrettyDates(product.created_at)}
				</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit product')}
					onDelete={() => console.error('on delete product')}
					onRestore={() => console.error('on restore product')}
					isDeleted={product.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
