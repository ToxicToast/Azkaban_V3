import { Stats } from '../components';
import { Group, Notebook, Users } from 'lucide-react';

export function AzkabanStats() {
    return (
        <>
            <Stats
                title="Total Azkaban Notifications"
                icon={<Notebook className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Azkaban Users"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Azkaban Groups"
                icon={<Group className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
        </>
    );
}
