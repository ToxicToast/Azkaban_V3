import { Table, TableBody } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useBrandState } from '../../shared/store/foodfolio';
import { LocationHeaders } from '../components/location-headers.component';
import { LocationList } from '../components/location-list.component';

function LocationDashboardPage() {
	const { brandData } = useBrandState();

	return (
		<>
			<PageTitle
				title="Locations"
				description="All Foodfolio Locations."
				type="Location"
				onAdd={console.log}
			/>

			<div className="p-6 pt-0">
				<Table>
					<LocationHeaders />
					<TableBody>
						{brandData.map((location) => (
							<LocationList
								key={location.id}
								location={location}
								onView={console.error}
							/>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

export default LocationDashboardPage;
