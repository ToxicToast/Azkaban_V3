import { LatestViewer } from '../atoms/twitch/latest-viewer.atom';
import { LatestStream } from '../atoms/twitch/latest-stream.atom';
import { LatestMessage } from '../atoms/twitch/latest-message.atom';
import { LatestBan } from '../atoms/twitch/latest-ban.atom';

export function TwitchLatest() {
	return (
		<>
			<LatestViewer />
			<LatestStream />
			<LatestMessage />
			<LatestBan />
		</>
	);
}
