import { Mapper } from '@toxictoast/azkaban-base-domain';
import { ItemVariantDAO } from '../../dao';
import { ItemVariantEntity } from '../entities';
import { ItemVariantFactory } from '@azkaban/foodfolio-domain';

export class ItemVariantMapper
	implements Mapper<ItemVariantDAO, ItemVariantEntity>
{
	private readonly domainFactory: ItemVariantFactory =
		new ItemVariantFactory();

	toEntity(data: ItemVariantDAO): ItemVariantEntity {
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
		const entity = new ItemVariantEntity();
		entity.id = id;
		entity.item_id = item_id;
		entity.category_id = category_id;
		entity.location_id = location_id;
		entity.company_id = company_id;
		entity.size_id = size_id;
		entity.type_id = type_id;
		entity.warehouse_id = warehouse_id;
		entity.title = title;
		entity.sku = sku;
		entity.ean = ean;
		entity.price = price;
		entity.activated_at = activated_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: ItemVariantEntity): ItemVariantDAO {
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
		const aggregate = this.domainFactory.reconstitute({
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
			isActive: !!activated_at,
			isUpdated: !!updated_at,
			isDeleted: !!deleted_at,
		});
		return this.domainFactory.constitute(aggregate);
	}
}
