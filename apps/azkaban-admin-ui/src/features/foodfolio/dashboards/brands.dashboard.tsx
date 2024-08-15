import { Table, TableBody } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useBrandState } from '../../shared/store/foodfolio';
import { BrandHeaders } from '../components/brand-headers.component';
import { BrandList } from '../components/brand-list.component';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioBrandAddRoute,
	foodfolioBrandViewRoute,
} from '../../../config/routes';

function BrandsDashboardPage() {
	const { brandData, selectBrandId } = useBrandState();
	const navigate = useNavigate();

	const onView = useCallback(
		(brandId: string) => {
			selectBrandId(brandId);
			navigate(foodfolioBrandViewRoute);
		},
		[navigate, selectBrandId],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioBrandAddRoute);
	}, [navigate]);

	return (
		<>
			<PageTitle
				title="Brands"
				description="All Foodfolio Brands."
				type="Brand"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table>
					<BrandHeaders />
					<TableBody>
						{brandData.map((brand) => (
							<BrandList
								key={brand.id}
								brand={brand}
								onView={() => onView(brand.id)}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

export default BrandsDashboardPage;
