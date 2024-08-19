import { Stats } from '../../components';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useProductVariantState } from '../../../shared/store/foodfolio';
import { foodfolioProductVariantRoute } from '../../../../config/routes';
import { Link } from 'react-router-dom';

export function StatsProductVariants() {
	const { productVariantCount } = useProductVariantState();

	return (
		<Link to={foodfolioProductVariantRoute}>
			<Stats
				title="Total Foodfolio Product Variants"
				icon={<Cross1Icon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(productVariantCount)}
			/>
		</Link>
	);
}
