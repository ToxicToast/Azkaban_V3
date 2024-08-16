import { Factory } from '@toxictoast/azkaban-base-domain';
import { ItemAnemic } from '../anemics';
import { ItemAggregate } from '../aggregates';
import { ItemData } from '../data';
import { ItemId } from '../valueObjects';

export class ItemFactory
	implements Factory<ItemAnemic, ItemAggregate, ItemData>
{
	reconstitute(data: ItemAnemic): ItemAggregate {
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

		const itemId = new ItemId(id);

		return new ItemAggregate(
			itemId.value,
			title,
			current_sku,
			min_sku,
			max_sku,
			activated_at,
			created_at,
			updated_at,
			deleted_at,
		);
	}

	constitute(data: ItemAggregate): ItemAnemic {
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
			isStockAlert,
			isOverStocked,
			isActive,
			isUpdated,
			isDeleted,
		} = data.toAnemic();

		const itemId = new ItemId(id);

		return {
			id: itemId.value,
			title,
			current_sku,
			min_sku,
			max_sku,
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
		const { title, current_sku, min_sku, max_sku } = data;

		const itemId = new ItemId();

		return new ItemAggregate(
			itemId.value,
			title,
			current_sku,
			min_sku,
			max_sku,
			null,
			new Date(),
			null,
			null,
		);
	}
}
