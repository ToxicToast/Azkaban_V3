import {
    AzkabanStatsWidget,
    FoodfolioStatsWidget,
    TwitchStatsWidget,
} from './widgets';

function DashboardPage() {
    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <AzkabanStatsWidget />
            <FoodfolioStatsWidget />
            <TwitchStatsWidget />
        </div>
    );
}

export default DashboardPage;
