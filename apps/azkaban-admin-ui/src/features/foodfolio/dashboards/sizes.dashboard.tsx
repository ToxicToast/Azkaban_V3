import { Show, Table, TableBody } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioSizeAddRoute,
	foodfolioSizeViewRoute,
} from '../../../config/routes';
import { SizeHeaders } from '../components/size-headers.component';
import { useSizeState } from '../../shared/store/foodfolio';
import { SizeList } from '../components/size-list.component';
import { SizeFooter } from '../components/size-footer.component';

function SizeDashboardPage() {
	const { sizeData, sizeCount, selectSizeId } = useSizeState();
	const navigate = useNavigate();

	const onView = useCallback(
		(sizeId: string) => {
			selectSizeId(sizeId);
			navigate(foodfolioSizeViewRoute);
		},
		[navigate, selectSizeId],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioSizeAddRoute);
	}, [navigate]);

	return (
		<>
			<PageTitle
				title="Sizes"
				description="All Foodfolio Sizes."
				type="Size"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table>
					<SizeHeaders />
					<TableBody>
						{sizeData.map((size) => (
							<SizeList
								key={size.id}
								size={size}
								onView={() => onView(size.id)}
							/>
						))}
					</TableBody>
					<Show show={sizeCount === 0}>
						<SizeFooter />
					</Show>
				</Table>
			</div>
		</>
	);
}

export default SizeDashboardPage;
