import { Show, Table, TableBody } from '../../shared';
import { PageTitle } from '../../shared/components/components/page-title.component';
import { useLocationState } from '../../shared/store/foodfolio';
import { LocationHeaders } from '../components/location-headers.component';
import { LocationList } from '../components/location-list.component';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import {
	foodfolioLocationAddRoute,
	foodfolioLocationViewRoute,
} from '../../../config/routes';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { LocationFooter } from '../components/location-footer.component';

function LocationDashboardPage() {
	const { locationData, locationCount, selectLocationId } =
		useLocationState();
	const navigate = useNavigate();

	const onView = useCallback(
		(locationId: string) => {
			selectLocationId(locationId);
			navigate(foodfolioLocationViewRoute);
		},
		[navigate, selectLocationId],
	);

	const onAdd = useCallback(() => {
		navigate(foodfolioLocationAddRoute);
	}, [navigate]);

	const findParent = useCallback(
		(parentId: Nullable<string>) => {
			return locationData.find((location) => location.id === parentId);
		},
		[locationData],
	);

	return (
		<>
			<PageTitle
				title="Locations"
				description="All Foodfolio Locations."
				type="Location"
				onAdd={() => onAdd()}
			/>

			<div className="p-6 pt-0">
				<Table className="rounded border">
					<LocationHeaders />
					<TableBody>
						{locationData.map((location) => (
							<LocationList
								key={location.id}
								location={location}
								onView={() => onView(location.id)}
								parent={findParent(location.parent_id) ?? null}
							/>
						))}
					</TableBody>
					<Show show={locationCount === 0}>
						<LocationFooter />
					</Show>
				</Table>
			</div>
		</>
	);
}

export default LocationDashboardPage;
