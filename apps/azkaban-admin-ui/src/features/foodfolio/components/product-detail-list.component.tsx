import { FoodFolioItem, FoodFolioItemDetail } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';
import {
	PrettyDates,
	PrettyDateDistance,
	PrettyDateDistanceReversed,
	getStatusText,
	getStatusVariant,
} from '../../shared/helpers';
import { Badge, Show, TableCell, TableRow } from '../../shared';
import { Actions } from '../../shared/components/components/actions.component';
import { useMemo } from 'react';

interface Props {
	detail: FoodFolioItemDetail;
	item: Nullable<FoodFolioItem>;
	onView: () => void;
}

export function ProductDetailList(props: Props) {
	const { detail, item, onView } = props;

	const getDetailStatus = useMemo(() => {
		return getStatusText(detail.isDeleted, false, detail.isActive);
	}, [detail.isActive, detail.isDeleted]);

	const getDetailStatusVariant = useMemo(() => {
		return getStatusVariant(detail.isDeleted, false, detail.isActive);
	}, [detail.isActive, detail.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{item?.title}</TableCell>

			<TableCell>
				<Badge variant="outline">
					{PrettyDateDistance(detail.purchase_date)}
				</Badge>
			</TableCell>

			<TableCell>
				<Show show={detail.expiration_date !== null}>
					<Badge
						variant={detail.isExpired ? 'destructive' : 'outline'}
					>
						{PrettyDateDistanceReversed(
							detail.expiration_date ?? new Date(),
						)}
					</Badge>
				</Show>
			</TableCell>

			<TableCell>
				<Show show={detail.opening_date !== null}>
					<Badge variant={detail.isOpened ? 'secondary' : 'outline'}>
						{PrettyDateDistance(detail.opening_date ?? new Date())}
					</Badge>
				</Show>
			</TableCell>

			<TableCell>
				<Badge variant={getDetailStatusVariant}>
					{getDetailStatus}
				</Badge>
			</TableCell>

			<TableCell>
				<Badge variant="outline">
					{PrettyDates(detail.created_at)}
				</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit product')}
					onDelete={() => console.error('on delete product')}
					onRestore={() => console.error('on restore product')}
					isDeleted={detail.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
