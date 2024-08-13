import {
	AzkabanLatest,
	AzkabanStats,
	FoodfolioStats,
	TwitchStats,
} from './widgets';
import { DashboardHeadline } from './components/headline';
import { FoodFolioLatest } from './widgets/foodfolio-latest';
import { useAuthState } from '../shared/store/auth/auth.hook';
import { Show } from '../shared';

function DashboardPage() {
	const { canSeeAzkaban, canSeeFoodfolio, canSeeTwitch } = useAuthState();

	return (
		<>
			<DashboardHeadline title="Azkaban" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Show show={canSeeAzkaban}>
					<AzkabanStats />
				</Show>
			</div>

			<DashboardHeadline title="FoodFolio" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Show show={canSeeFoodfolio}>
					<FoodfolioStats />
				</Show>
			</div>

			<DashboardHeadline title="Twitch" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Show show={canSeeTwitch}>
					<TwitchStats />
				</Show>
			</div>

			<DashboardHeadline title="Latest" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Show show={canSeeAzkaban}>
					<AzkabanLatest />
				</Show>
				<br />
				<Show show={canSeeFoodfolio}>
					<FoodFolioLatest />
				</Show>
			</div>
		</>
	);
}

export default DashboardPage;
