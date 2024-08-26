import { FoodFolioItem } from '@toxictoast/azkaban-sdk';
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
}

export function ProductList(props: Props) {
	const { product, onView } = props;

	const getProductStatus = useMemo(() => {
		return getStatusText(product.isDeleted, false, product.isActive);
	}, [product.isActive, product.isDeleted]);

	const getProductStatusVariant = useMemo(() => {
		return getStatusVariant(product.isDeleted, false, product.isActive);
	}, [product.isActive, product.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{product.title}</TableCell>
			<TableCell>{product?.current_sku}</TableCell>
			<TableCell>{product?.min_sku}</TableCell>
			<TableCell>{product?.max_sku}</TableCell>
			<TableCell>
				<Badge variant={getProductStatusVariant}>
					{getProductStatus}
				</Badge>
			</TableCell>
			<TableCell>{PrettyDates(product.created_at)}</TableCell>
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
