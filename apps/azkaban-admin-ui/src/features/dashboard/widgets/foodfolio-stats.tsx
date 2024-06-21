import { Stats } from '../components';
import { CubeIcon } from '@radix-ui/react-icons';

export function FoodfolioStats() {
    return (
        <>
            <Stats
                title="Total Foodfolio Categories"
                icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Foodfolio Brands"
                icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Foodfolio Products"
                icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Foodfolio Locations"
                icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Foodfolio Sizes"
                icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Foodfolio Types"
                icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Foodfolio Receipts"
                icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
            <Stats
                title="Total Foodfolio Warehouses"
                icon={<CubeIcon className="h-4 w-4 text-muted-foreground" />}
                statistic="0"
            />
        </>
    );
}
