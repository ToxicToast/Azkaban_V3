import { Stats } from '../components';
import { Twitch } from 'lucide-react';

export function TwitchStatsWidget() {
    return (
        <>
            <Stats
                title="Total Twitch Viewers"
                icon={<Twitch className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Twitch Streams"
                icon={<Twitch className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Twitch Messages"
                icon={<Twitch className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Twitch Bans"
                icon={<Twitch className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
        </>
    );
}
