import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { Badge, TableCell, TableRow } from '../../shared';
import { useMemo } from 'react';
import { Actions } from '../../shared/components/components/actions.component';

interface Props {
	category: FoodFolioCategory;
	onView: () => void;
}

export function CategoryList(props: Props) {
	const { category, onView } = props;

	const getCategoryStatus = useMemo(() => {
		if (category.isDeleted) {
			return 'Deleted';
		} else if (!category.isActive) {
			return 'Inactive';
		}
		return 'Active';
	}, [category.isActive, category.isDeleted]);

	const getCategoryStatusVariant = useMemo(() => {
		if (category.isDeleted) {
			return 'destructive';
		} else if (!category.isActive) {
			return 'outline';
		}
		return 'default';
	}, [category.isActive, category.isDeleted]);

	return (
		<TableRow>
			<TableCell className="font-medium">{category.title}</TableCell>
			<TableCell>
				<Badge variant="outline">
					{category.isParent ? 'Root' : 'Not Root'}
				</Badge>
			</TableCell>
			<TableCell>
				<Badge variant={getCategoryStatusVariant}>
					{getCategoryStatus}
				</Badge>
			</TableCell>
			<TableCell>
				<Actions
					onView={() => onView()}
					onEdit={() => console.error('on edit category')}
					onDelete={() => console.error('on delete category')}
				/>
			</TableCell>
		</TableRow>
	);
}
