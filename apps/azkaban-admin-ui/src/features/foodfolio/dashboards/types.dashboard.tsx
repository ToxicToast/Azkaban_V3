import { Show, Table, TableBody } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioTypeAddRoute,
	foodfolioTypeViewRoute,
} from '../../../config/routes';
import { TypeHeaders } from '../components/type-headers.component';
import { useTypeState } from '../../shared/store/foodfolio';
import { TypeList } from '../components/type-list.component';
import { TypeFooter } from '../components/type-footer.component';

function TypeDashboardPage() {
	const { typeData, typeCount, selectTypeId } = useTypeState();
	const navigate = useNavigate();

	const onView = useCallback(
		(typeId: string) => {
			selectTypeId(typeId);
			navigate(foodfolioTypeViewRoute);
		},
		[navigate, selectTypeId],
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
					<TableBody>
						{typeData.map((type) => (
							<TypeList
								key={type.id}
								type={type}
								onView={() => onView(type.id)}
							/>
						))}
					</TableBody>
					<Show show={typeCount === 0}>
						<TypeFooter />
					</Show>
				</Table>
			</div>
		</>
	);
}

export default TypeDashboardPage;
