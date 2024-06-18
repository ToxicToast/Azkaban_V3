import { Stats } from './components';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';

function DashboardPage() {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Stats
                title="Total Revenue"
                icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
                statistic="$45,231.89"
                fromLastMonth="+20.1%"
            />
            <Stats
                title="Subscriptions"
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                statistic="+2350"
                fromLastMonth="+180.1%"
            />
            <Stats
                title="Sales"
                icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
                statistic="+12,234"
                fromLastMonth="+19%"
            />
            <Stats
                title="Active Now"
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
                statistic="+573"
                fromLastMonth="+201"
            />
        </div>
    );
}

export default DashboardPage;
