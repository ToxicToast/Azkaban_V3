import { SidebarLink } from './link';
import {
	foodfolioBrandRoute,
	foodfolioBrandViewRoute,
	foodfolioCategoryAddRoute,
	foodfolioCategoryRoute,
	foodfolioCategoryViewRoute,
	foodfolioLocationRoute,
	foodfolioSizeRoute,
	foodfolioTypeRoute,
} from '../../../../../../config/routes';
import { CubeIcon } from '@radix-ui/react-icons';
import { Show } from '../../../../widgets';

interface Props {
	canSee: boolean;
}

export function SidebarFoodfolio(props: Props) {
	const { canSee } = props;

	return (
		<Show show={canSee}>
			<SidebarLink
				title="Categories"
				path={foodfolioCategoryRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[
					foodfolioCategoryViewRoute,
					foodfolioCategoryAddRoute,
				]}
			/>
			<SidebarLink
				title="Brands"
				path={foodfolioBrandRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[foodfolioBrandViewRoute]}
			/>
			<SidebarLink
				title="Products"
				path="/foodfolio/products"
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
			<SidebarLink
				title="Product Details"
				path="/foodfolio/product-details"
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
			<SidebarLink
				title="Locations"
				path={foodfolioLocationRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
			/>
			<SidebarLink
				title="Sizes"
				path={foodfolioSizeRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
			/>
			<SidebarLink
				title="Types"
				path={foodfolioTypeRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
			/>
			<SidebarLink
				title="Receipts"
				path="/foodfolio/receipts"
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
			<SidebarLink
				title="Warehouses"
				path="/foodfolio/warehouses"
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
		</Show>
	);
}
