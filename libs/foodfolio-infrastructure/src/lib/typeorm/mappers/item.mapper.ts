import { Mapper } from '@toxictoast/azkaban-base-domain';
import { ItemFactory } from '@azkaban/foodfolio-domain';
import { ItemDAO } from '../../dao';
import { ItemEntity } from '../entities';

export class ItemMapper implements Mapper<ItemDAO, ItemEntity> {
	private readonly domainFactory: ItemFactory = new ItemFactory();

	toEntity(data: ItemDAO): ItemEntity {
		const {
			id,
			title,
			current_sku,
			min_sku,
			max_sku,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new ItemEntity();
		entity.id = id;
		entity.title = title;
		entity.current_sku = current_sku;
		entity.min_sku = min_sku;
		entity.max_sku = max_sku;
		entity.activated_at = activated_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: ItemEntity): ItemDAO {
		const {
			id,
			title,
			current_sku,
			min_sku,
			max_sku,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			title,
			current_sku,
			min_sku,
			max_sku,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
			isActive: !!activated_at,
			isUpdated: !!updated_at,
			isDeleted: !!deleted_at,
			isStockAlert: current_sku < min_sku,
			isOverStocked: current_sku > max_sku,
		});
		return this.domainFactory.constitute(aggregate);
	}
}
