import { Factory } from '@toxictoast/azkaban-base-domain';
import { ItemAnemic } from '../anemics';
import { ItemAggregate } from '../aggregates';
import { ItemData } from '../data';
import { CompanyId, ItemId, LocationId, SizeId, TypeId } from '../valueObjects';
import { CategoryId } from '../valueObjects';
import { WarehouseId } from '../valueObjects/warehouseId.valueObject';

export class ItemFactory
    implements Factory<ItemAnemic, ItemAggregate, ItemData>
{
    reconstitute(data: ItemAnemic): ItemAggregate {
        const {
            id,
            category_id,
            location_id,
            company_id,
            size_id,
            type_id,
            warehouse_id,
            title,
            current_sku,
            min_sku,
            max_sku,
            ean,
            price,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        } = data;

        const itemId = new ItemId(id);
        const categoryId = new CategoryId(category_id, true);
        const locationId = new LocationId(location_id, true);
        const companyId = new CompanyId(company_id, true);
        const sizeId = new SizeId(size_id, true);
        const typeId = new TypeId(type_id, true);
        const warehouseId = new WarehouseId(warehouse_id, true);

        return new ItemAggregate(
            itemId.value,
            categoryId.value,
            locationId.value,
            companyId.value,
            sizeId.value,
            typeId.value,
            warehouseId.value,
            title,
            current_sku,
            min_sku,
            max_sku,
            ean,
            price,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
        );
    }

    constitute(data: ItemAggregate): ItemAnemic {
        const {
            id,
            category_id,
            location_id,
            company_id,
            size_id,
            type_id,
            warehouse_id,
            title,
            current_sku,
            min_sku,
            max_sku,
            ean,
            price,
            activated_at,
            created_at,
            updated_at,
            deleted_at,
            isStockAlert,
            isOverStocked,
            isActive,
            isUpdated,
            isDeleted,
        } = data.toAnemic();

        const itemId = new ItemId(id);
        const categoryId = new CategoryId(category_id, true);
        const locationId = new LocationId(location_id, true);
        const companyId = new CompanyId(company_id, true);
        const sizeId = new SizeId(size_id, true);
        const typeId = new TypeId(type_id, true);
        const warehouseId = new WarehouseId(warehouse_id, true);

        return {
            id: itemId.value,
            category_id: categoryId.value,
            location_id: locationId.value,
            company_id: companyId.value,
            size_id: sizeId.value,
            type_id: typeId.value,
            warehouse_id: warehouseId.value,
            title,
            current_sku,
            min_sku,
            max_sku,
            ean,
            price,
            isStockAlert,
            isOverStocked,
            activated_at,
            isActive,
            created_at,
            updated_at,
            deleted_at,
            isUpdated,
            isDeleted,
        };
    }

    createDomain(data: ItemData): ItemAggregate {
        const {
            category_id,
            location_id,
            company_id,
            size_id,
            type_id,
            warehouse_id,
            title,
            current_sku,
            min_sku,
            max_sku,
            ean,
            price,
        } = data;

        const itemId = new ItemId();
        const categoryId = new CategoryId(category_id, true);
        const locationId = new LocationId(location_id, true);
        const companyId = new CompanyId(company_id, true);
        const sizeId = new SizeId(size_id, true);
        const typeId = new TypeId(type_id, true);
        const warehouseId = new WarehouseId(warehouse_id, true);

        return new ItemAggregate(
            itemId.value,
            categoryId.value,
            locationId.value,
            companyId.value,
            sizeId.value,
            typeId.value,
            warehouseId.value,
            title,
            current_sku,
            min_sku,
            max_sku,
            ean,
            price,
            null,
            new Date(),
            null,
            null,
        );
    }
}
