import { Mapper } from '@toxictoast/azkaban-base-domain';
import { ItemDetailFactory } from '@azkaban/foodfolio-domain';
import { ItemDetailDAO } from '../../dao';
import { ItemDetailEntity } from '../entities';

export class ItemDetailMapper
	implements Mapper<ItemDetailDAO, ItemDetailEntity>
{
	private readonly domainFactory: ItemDetailFactory = new ItemDetailFactory();

	toEntity(data: ItemDetailDAO): ItemDetailEntity {
		console.error('toEntity::data', data);
		const {
			id,
			item_id,
			art_no,
			purchase_date,
			expiration_date,
			opening_date,
			returnable,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;
		const entity = new ItemDetailEntity();
		entity.id = id;
		entity.item_id = item_id;
		entity.art_no = art_no;
		entity.purchase_date = purchase_date;
		entity.expiration_date = expiration_date;
		entity.opening_date = opening_date;
		entity.returnable = returnable;
		entity.activated_at = activated_at;
		entity.created_at = created_at;
		entity.updated_at = updated_at;
		entity.deleted_at = deleted_at;
		console.error('toEntity::entity', entity);
		return entity;
	}

	toDomain(data: ItemDetailEntity): ItemDetailDAO {
		console.error('toDomain::data', data);
		const {
			id,
			item_id,
			art_no,
			purchase_date,
			expiration_date,
			opening_date,
			returnable,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		} = data;

		const date = new Date().getTime();

		const aggregate = this.domainFactory.reconstitute({
			id,
			item_id,
			art_no,
			purchase_date,
			expiration_date,
			opening_date,
			returnable,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
			isActive: !!activated_at,
			isUpdated: !!updated_at,
			isDeleted: !!deleted_at,
			isExpired: date > expiration_date?.getTime(),
			isOpened: !!opening_date,
		});
		console.error('toDomain::aggregate', aggregate);
		return this.domainFactory.constitute(aggregate);
	}
}
