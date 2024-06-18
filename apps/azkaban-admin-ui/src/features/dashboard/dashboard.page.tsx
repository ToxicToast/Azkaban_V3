import { Stats } from './components';
import {
    DollarSign,
    Users,
    CreditCard,
    Activity,
    Group,
    Notebook,
} from 'lucide-react';

function DashboardPage() {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Stats
                title="Total Notifications"
                icon={<Notebook className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Users"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Groups"
                icon={<Group className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
        </div>
    );
}

export default DashboardPage;
