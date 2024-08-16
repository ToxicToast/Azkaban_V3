import { Stats } from '../../components';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useProductDetailState } from '../../../shared/store/foodfolio';
import { foodfolioProductDetailRoute } from '../../../../config/routes';
import { Link } from 'react-router-dom';

export function StatsProductDetails() {
	const { productDetailCount } = useProductDetailState();

	return (
		<Link to={foodfolioProductDetailRoute}>
			<Stats
				title="Total Foodfolio Product Details"
				icon={<Cross1Icon className="h-4 w-4 text-muted-foreground" />}
				statistic={String(productDetailCount)}
			/>
		</Link>
	);
}
