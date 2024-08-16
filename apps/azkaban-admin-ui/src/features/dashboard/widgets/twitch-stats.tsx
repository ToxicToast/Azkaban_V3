import { StatsViewer } from '../atoms/twitch/stats-viewer.atom';
import { StatsStream } from '../atoms/twitch/stats-stream.atom';
import { StatsMessage } from '../atoms/twitch/stats-message.atom';
import { StatsBan } from '../atoms/twitch/stats-ban.atom';

export function TwitchStats() {
	return (
		<>
			<StatsViewer />
			<StatsStream />
			<StatsMessage />
			<StatsBan />
		</>
	);
}
