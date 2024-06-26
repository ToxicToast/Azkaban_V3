import { Stats } from '../components';
import { Group, Notebook, Users } from 'lucide-react';
import { useAzkabanStatsViewmodel } from '../viewmodels/azkaban-stats-viewmodel';
import { Link } from 'react-router-dom';

export function AzkabanStats() {
    const { userDataCount } = useAzkabanStatsViewmodel();

    return (
        <>
            <Link to={`/notifications`}>
                <Stats
                    title="Total Azkaban Notifications"
                    icon={
                        <Notebook className="h-4 w-4 text-muted-foreground" />
                    }
                    statistic="0"
                />
            </Link>

            <Link to={`/users`}>
                <Stats
                    title="Total Azkaban Users"
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                    statistic={String(userDataCount)}
                />
            </Link>

            <Link to={`/groups`}>
                <Stats
                    title="Total Azkaban Groups"
                    icon={<Group className="h-4 w-4 text-muted-foreground" />}
                    statistic="0"
                />
            </Link>
        </>
    );
}
