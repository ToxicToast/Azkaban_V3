import { useCategoryState } from '../../shared/store/foodfolio';
import { Table } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioCategoryAddRoute,
	foodfolioCategoryViewRoute,
} from '../../../config/routes';
import { CategoryHeaders } from '../components/category-headers.component';
import { CategoryList } from '../components/category-list.component';
import { PageTitle } from '../../shared/components/components/page-title.component';

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

	const onAdd = useCallback(() => {
		navigate(foodfolioCategoryAddRoute);
	}, [navigate]);

	return (
		<>
			<PageTitle
				title="Categories"
				description="All Foodfolio Categories."
				type="Category"
				onAdd={() => onAdd()}
			/>

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
