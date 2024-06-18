import { Stats } from '../components';
import { Cuboid } from 'lucide-react';

export function TwitchStatsWidget() {
    return (
        <>
            <Stats
                title="Total Twitch Viewers"
                icon={<Cuboid className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Twitch Streams"
                icon={<Cuboid className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Twitch Messages"
                icon={<Cuboid className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Twitch Bans"
                icon={<Cuboid className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
        </>
    );
}
