import { AzkabanStats, FoodfolioStats, TwitchStats } from './widgets';

function DashboardPage() {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <AzkabanStats />
            <FoodfolioStats />
            <TwitchStats />
        </div>
    );
}

export default DashboardPage;
