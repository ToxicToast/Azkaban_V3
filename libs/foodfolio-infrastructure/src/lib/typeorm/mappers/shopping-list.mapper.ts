import { Mapper } from '@toxictoast/azkaban-base-domain';
import { ShoppingListDAO } from '../../dao';
import { ShoppingListEntity } from '../entities';
import { ShoppingListFactory } from '@azkaban/foodfolio-domain';

export class ShoppingListMapper
	implements Mapper<ShoppingListDAO, ShoppingListEntity>
{
	private readonly domainFactory: ShoppingListFactory =
		new ShoppingListFactory();

	toEntity(data: ShoppingListDAO): ShoppingListEntity {
		const {
			id,
			item_id,
			variant_id,
			current_sku,
			min_sku,
			max_sku,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new ShoppingListEntity();
		entity.id = id;
		entity.item_id = item_id;
		entity.variant_id = variant_id;
		entity.current_sku = current_sku;
		entity.min_sku = min_sku;
		entity.max_sku = max_sku;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		return entity;
	}

	toDomain(data: ShoppingListEntity): ShoppingListDAO {
		const {
			id,
			item_id,
			variant_id,
			current_sku,
			min_sku,
			max_sku,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const aggregate = this.domainFactory.reconstitute({
			id,
			item_id,
			variant_id,
			current_sku,
			min_sku,
			max_sku,
			created_at,
			updated_at,
			deleted_at,
			isUpdated: !!updated_at,
			isDeleted: !!deleted_at,
		});
		return this.domainFactory.constitute(aggregate);
	}
}
