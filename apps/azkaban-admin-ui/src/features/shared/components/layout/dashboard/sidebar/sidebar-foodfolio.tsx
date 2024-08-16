import { SidebarLink } from './link';
import {
	foodfolioBrandAddRoute,
	foodfolioBrandRoute,
	foodfolioBrandViewRoute,
	foodfolioCategoryAddRoute,
	foodfolioCategoryRoute,
	foodfolioCategoryViewRoute,
	foodfolioLocationAddRoute,
	foodfolioLocationRoute,
	foodfolioLocationViewRoute,
	foodfolioProductAddRoute,
	foodfolioProductDetailAddRoute,
	foodfolioProductDetailRoute,
	foodfolioProductDetailViewRoute,
	foodfolioProductRoute,
	foodfolioProductVariantAddRoute,
	foodfolioProductVariantRoute,
	foodfolioProductVariantViewRoute,
	foodfolioProductViewRoute,
	foodfolioSizeAddRoute,
	foodfolioSizeRoute,
	foodfolioSizeViewRoute,
	foodfolioTypeAddRoute,
	foodfolioTypeRoute,
	foodfolioTypeViewRoute,
	foodfolioWarehouseAddRoute,
	foodfolioWarehouseRoute,
	foodfolioWarehouseViewRoute,
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
				otherPaths={[foodfolioBrandViewRoute, foodfolioBrandAddRoute]}
			/>
			<SidebarLink
				title="Products"
				path={foodfolioProductRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[
					foodfolioProductViewRoute,
					foodfolioProductAddRoute,
				]}
			/>
			<SidebarLink
				title="Product Variants"
				path={foodfolioProductVariantRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[
					foodfolioProductVariantViewRoute,
					foodfolioProductVariantAddRoute,
				]}
			/>
			<SidebarLink
				title="Product Details"
				path={foodfolioProductDetailRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[
					foodfolioProductDetailViewRoute,
					foodfolioProductDetailAddRoute,
				]}
			/>
			<SidebarLink
				title="Locations"
				path={foodfolioLocationRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[
					foodfolioLocationViewRoute,
					foodfolioLocationAddRoute,
				]}
			/>
			<SidebarLink
				title="Sizes"
				path={foodfolioSizeRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[foodfolioSizeViewRoute, foodfolioSizeAddRoute]}
			/>
			<SidebarLink
				title="Types"
				path={foodfolioTypeRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[foodfolioTypeViewRoute, foodfolioTypeAddRoute]}
			/>
			<SidebarLink
				title="Receipts"
				path="/foodfolio/receipts"
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
			<SidebarLink
				title="Warehouses"
				path={foodfolioWarehouseRoute}
				icon={<CubeIcon className="h-4 w-4 shrink-0" />}
				otherPaths={[
					foodfolioWarehouseViewRoute,
					foodfolioWarehouseAddRoute,
				]}
			/>
		</Show>
	);
}
