import { useCategoryState } from '../../shared/store/foodfolio';
import { Button, Table } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { foodfolioCategoryViewRoute } from '../../../config/routes';
import { CategoryHeaders } from '../components/category-headers.component';
import { CategoryList } from '../components/category-list.component';
import { PlusCircleIcon } from 'lucide-react';

function CategoryDashboardPage() {
	const { categoryData, selectCategoryId } = useCategoryState();
	const navigate = useNavigate();

	const onView = useCallback(
		(userId: string) => {
			selectCategoryId(userId);
			navigate(foodfolioCategoryViewRoute.replace(':id', userId));
		},
		[navigate, selectCategoryId],
	);

	return (
		<>
			<div className="flex flex-row items-center justify-between p-6 px-7">
				<div className="flex flex-col space-y-1.5 p-6 px-7">
					<h3 className="font-semibold leading-none tracking-tight">
						Categories
					</h3>
					<p className="text-sm text-muted-foreground">
						All Foodfolio Categories.
					</p>
				</div>

				<Button variant="default" className="text-xs">
					<PlusCircleIcon className="h-3.5 w-3.5" />
					&nbsp;Add Category
				</Button>
			</div>

			<div className="p-6 pt-0">
				<Table>
					<CategoryHeaders />
					{categoryData.map((category) => (
						<CategoryList
							key={category.id}
							category={category}
							onView={() => onView(category.id)}
						/>
					))}
				</Table>
			</div>
		</>
	);
}

export default CategoryDashboardPage;
