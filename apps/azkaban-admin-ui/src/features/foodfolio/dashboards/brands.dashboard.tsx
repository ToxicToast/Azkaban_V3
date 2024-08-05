import { Debugger, Table } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';

function BrandsDashboardPage() {
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
					<Debugger data={[]} />
				</Table>
			</div>
		</>
	);
}

export default BrandsDashboardPage;
