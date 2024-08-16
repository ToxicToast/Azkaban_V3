import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { Badge, TableCell, TableRow } from '../../shared';
import { useMemo } from 'react';
import { Actions } from '../../shared/components/components/actions.component';
import {
	getStatusText,
	getStatusVariant,
	PrettyDates,
} from '../../shared/helpers';
import { Nullable } from '@toxictoast/azkaban-base-types';

interface Props {
	category: FoodFolioCategory;
	onView: () => void;
	parent: Nullable<FoodFolioCategory>;
}

export function CategoryList(props: Props) {
	const { category, onView, parent } = props;

	const getCategoryStatus = useMemo(() => {
		return getStatusText(category.isDeleted, false, category.isActive);
	}, [category.isActive, category.isDeleted]);

	const getCategoryStatusVariant = useMemo(() => {
		return getStatusVariant(category.isDeleted, false, category.isActive);
	}, [category.isActive, category.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{category.title}</TableCell>
			<TableCell>
				<Badge variant={parent === null ? 'secondary' : 'outline'}>
					{parent === null ? 'Parent' : parent?.title}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={getCategoryStatusVariant}>
					{getCategoryStatus}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant="outline">
					{PrettyDates(category.created_at)}
				</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit category')}
					onDelete={() => console.error('on delete category')}
					onRestore={() => console.error('on restore category')}
					isDeleted={category.isDeleted}
				/>
			</TableCell>
		</TableRow>
	);
}
