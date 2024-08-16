import { Factory } from '@toxictoast/azkaban-base-domain';
import { ItemVariantAnemic } from '../anemics';
import { ItemVariantAggregate } from '../aggregates';
import { ItemVariantData } from '../data';
import {
	ItemVariantId,
	ItemId,
	CategoryId,
	LocationId,
	CompanyId,
	SizeId,
	TypeId,
	WarehouseId,
} from '../valueObjects';

export class ItemVariantFactory
	implements
		Factory<ItemVariantAnemic, ItemVariantAggregate, ItemVariantData>
{
	reconstitute(data: ItemVariantAnemic): ItemVariantAggregate {
		const {
			id,
			item_id,
			category_id,
			location_id,
			company_id,
			size_id,
			type_id,
			warehouse_id,
			title,
			sku,
			ean,
			price,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;

		const itemVariantId = new ItemVariantId(id);
		const itemId = new ItemId(item_id, true);
		const categoryId = new CategoryId(category_id, true);
		const locationId = new LocationId(location_id, true);
		const companyId = new CompanyId(company_id, true);
		const sizeId = new SizeId(size_id, true);
		const typeId = new TypeId(type_id, true);
		const warehouseId = new WarehouseId(warehouse_id, true);

		return new ItemVariantAggregate(
			itemVariantId.value,
			itemId.value,
			categoryId.value,
			locationId.value,
			companyId.value,
			sizeId.value,
			typeId.value,
			warehouseId.value,
			title,
			sku,
			ean,
			price,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		);
	}

	constitute(data: ItemVariantAggregate): ItemVariantAnemic {
		const {
			id,
			item_id,
			category_id,
			location_id,
			company_id,
			size_id,
			type_id,
			warehouse_id,
			title,
			sku,
			ean,
			price,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
			isActive,
			isUpdated,
			isDeleted,
		} = data.toAnemic();

		const itemVariantId = new ItemVariantId(id);
		const itemId = new ItemId(item_id, true);
		const categoryId = new CategoryId(category_id, true);
		const locationId = new LocationId(location_id, true);
		const companyId = new CompanyId(company_id, true);
		const sizeId = new SizeId(size_id, true);
		const typeId = new TypeId(type_id, true);
		const warehouseId = new WarehouseId(warehouse_id, true);

		return {
			id: itemVariantId.value,
			item_id: itemId.value,
			category_id: categoryId.value,
			location_id: locationId.value,
			company_id: companyId.value,
			size_id: sizeId.value,
			type_id: typeId.value,
			warehouse_id: warehouseId.value,
			title,
			sku,
			ean,
			price,
			activated_at,
			isActive,
			created_at,
			updated_at,
			deleted_at,
			isUpdated,
			isDeleted,
		};
	}

	createDomain(data: ItemVariantData): ItemVariantAggregate {
		const {
			title,
			item_id,
			category_id,
			location_id,
			company_id,
			size_id,
			type_id,
			warehouse_id,
			ean,
			price,
			sku,
		} = data;

		const itemVariantId = new ItemVariantId();
		const itemId = new ItemId(item_id, true);
		const categoryId = new CategoryId(category_id, true);
		const locationId = new LocationId(location_id, true);
		const companyId = new CompanyId(company_id, true);
		const sizeId = new SizeId(size_id, true);
		const typeId = new TypeId(type_id, true);
		const warehouseId = new WarehouseId(warehouse_id, true);

		return new ItemVariantAggregate(
			itemVariantId.value,
			itemId.value,
			categoryId.value,
			locationId.value,
			companyId.value,
			sizeId.value,
			typeId.value,
			warehouseId.value,
			title,
			sku,
			ean,
			price,
			null,
			new Date(),
			null,
			null,
		);
	}
}
