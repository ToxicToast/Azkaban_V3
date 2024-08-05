import { Debugger, Table, TableBody } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useBrandState } from '../../shared/store/foodfolio';
import { BrandHeaders } from '../components/brand-headers.component';
import { BrandList } from '../components/brand-list.component';

function BrandsDashboardPage() {
	const { brandData } = useBrandState();

	return (
		<>
			<PageTitle
				title="Brands"
				description="All Foodfolio Brands."
				type="Brand"
				onAdd={console.log}
			/>

			<div className="p-6 pt-0">
				<Table>
					<BrandHeaders />
					<TableBody>
						{brandData.map((brand) => (
							<BrandList
								key={brand.id}
								brand={brand}
								onView={console.error}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

export default BrandsDashboardPage;
