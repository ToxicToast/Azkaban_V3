import { Table, TableBody } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioTypeAddRoute,
	foodfolioTypeViewRoute,
} from '../../../config/routes';
import { TypeHeaders } from '../components/type-headers.component';

function TypeDashboardPage() {
	const navigate = useNavigate();

	const onView = useCallback(
		(sizeId: string) => {
			navigate(foodfolioTypeViewRoute.replace(':id', sizeId));
		},
		[navigate],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioTypeAddRoute);
	}, [navigate]);

	return (
		<>
			<PageTitle
				title="Types"
				description="All Foodfolio Types."
				type="Type"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table>
					<TypeHeaders />
					<TableBody>TypeList</TableBody>
				</Table>
			</div>
		</>
	);
}

export default TypeDashboardPage;
