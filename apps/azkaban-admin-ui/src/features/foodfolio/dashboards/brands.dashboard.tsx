import { Debugger, Table } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useBrandState } from '../../shared/store/foodfolio';

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
					<Debugger data={brandData} />
				</Table>
			</div>
		</>
	);
}

export default BrandsDashboardPage;
