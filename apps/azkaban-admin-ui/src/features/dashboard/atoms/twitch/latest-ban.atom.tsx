import { Stats } from '../../components';
import { Cross1Icon } from '@radix-ui/react-icons';

export function LatestBan() {
	return (
		<Stats
			title="Latest Twitch Ban"
			icon={<Cross1Icon className="h-4 w-4 text-muted-foreground" />}
			statistic="Not Available"
			isDisabled={true}
		/>
	);
}
