import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { Badge, Button, TableCell, TableRow } from '../../shared';
import { useMemo } from 'react';

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
				<Button onClick={() => onView()}>View</Button>
			</TableCell>
		</TableRow>
	);
}
