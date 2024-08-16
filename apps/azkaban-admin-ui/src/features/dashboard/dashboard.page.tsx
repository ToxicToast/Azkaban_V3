import {
	AzkabanLatest,
	AzkabanStats,
	FoodFolioLatest,
	FoodfolioStats,
	TwitchLatest,
	TwitchStats,
	CoworkingLatest,
	CoworkingStats,
} from './widgets';
import { DashboardHeadline } from './components/headline';
import { useAuthState } from '../shared/store/auth/auth.hook';
import { Show } from '../shared';

function DashboardPage() {
	const { canSeeAzkaban, canSeeFoodfolio, canSeeTwitch, canSeeCoWorking } =
		useAuthState();

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

			<DashboardHeadline title="Co-Working" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Show show={canSeeCoWorking}>
					<CoworkingStats />
				</Show>
			</div>

			<DashboardHeadline title="Latest" />
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Show show={canSeeAzkaban}>
					<AzkabanLatest />
				</Show>
				<Show show={canSeeFoodfolio}>
					<FoodFolioLatest />
				</Show>
				<Show show={canSeeTwitch}>
					<TwitchLatest />
				</Show>
				<Show show={canSeeCoWorking}>
					<CoworkingLatest />
				</Show>
			</div>
		</>
	);
}

export default DashboardPage;
