import {
	AzkabanLatest,
	AzkabanStats,
	FoodfolioStats,
	TwitchStats,
} from './widgets';
import { DashboardHeadline } from './components/headline';
import { FoodFolioLatest } from './widgets/foodfolio-latest';

function DashboardPage() {
	return (
		<>
			<DashboardHeadline title="Azkaban" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<AzkabanStats />
			</div>

			<DashboardHeadline title="FoodFolio" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<FoodfolioStats />
			</div>

			<DashboardHeadline title="Twitch" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<TwitchStats />
			</div>

			<DashboardHeadline title="Latest" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<AzkabanLatest />
				<br />
				<FoodFolioLatest />
			</div>
		</>
	);
}

export default DashboardPage;
