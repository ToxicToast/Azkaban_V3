import { FoodFolioCategory } from '@toxictoast/azkaban-sdk';
import { Badge, Button, TableBody, TableCell, TableRow } from '../../shared';

interface Props {
	category: FoodFolioCategory;
	onView: () => void;
}

export function CategoryList(props: Props) {
	const { category, onView } = props;

	return (
		<TableBody>
			<TableRow>
				<TableCell className="font-medium">{category.title}</TableCell>
				<TableCell>
					<Badge variant="outline">
						{category.isParent ? 'Root' : 'Not Root'}
					</Badge>
				</TableCell>
				<TableCell>
					<Badge
						variant={category.isActive ? 'outline' : 'destructive'}
					>
						{category.isActive ? 'Active' : 'Inactive'}
					</Badge>
				</TableCell>
				<TableCell>
					<Badge
						variant={category.isDeleted ? 'destructive' : 'outline'}
					>
						{category.isDeleted ? 'Deleted' : 'Not Deleted'}
					</Badge>
				</TableCell>
				<TableCell>
					<Button onClick={() => onView()}>View</Button>
				</TableCell>
			</TableRow>
		</TableBody>
	);
}
