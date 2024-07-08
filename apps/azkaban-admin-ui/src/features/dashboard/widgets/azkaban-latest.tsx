import { Stats } from '../components';
import { Group, Notebook, Users } from 'lucide-react';
import { useAzkabanStatsViewmodel } from '../viewmodels/azkaban-stats-viewmodel';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';

export function AzkabanLatest() {
    const { latestUser } = useAzkabanStatsViewmodel();

    const getUserId = useMemo(() => {
        return latestUser?.id ?? '0';
    }, [latestUser?.id]);

    const getUsername = useMemo(() => {
        return latestUser?.username ?? 'No User :(';
    }, [latestUser?.username]);

    return (
        <>
            <Stats
                title="Latest Azkaban Notification"
                icon={<Notebook className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Link to={`/users/view/${getUserId}`}>
                <Stats
                    title="Latest Azkaban User"
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
                    statistic={getUsername}
                />
            </Link>
            <Stats
                title="Latest Azkaban Group"
                icon={<Group className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
        </>
    );
}
