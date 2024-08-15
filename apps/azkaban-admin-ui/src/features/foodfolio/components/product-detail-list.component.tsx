import { FoodFolioItem, FoodFolioItemDetail } from '@toxictoast/azkaban-sdk';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { PrettyDates } from '../../shared/helpers';
import { Badge, TableCell, TableRow } from '../../shared';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	detail: FoodFolioItemDetail;
	item: Nullable<FoodFolioItem>;
	onView: () => void;
}

export function ProductDetailList(props: Props) {
	const { detail, item, onView } = props;

	return (
		<TableRow>
			<TableCell className="font-medium">{item?.title}</TableCell>

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
