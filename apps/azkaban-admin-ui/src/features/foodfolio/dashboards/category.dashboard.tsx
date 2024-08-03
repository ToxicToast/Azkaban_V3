import { useCategoryState } from '../../shared/store/foodfolio';
import { Debugger } from '../../shared';

function CategoryDashboardPage() {
	const { categoryData } = useCategoryState();

	return <Debugger data={categoryData} />;
}

export default CategoryDashboardPage;
