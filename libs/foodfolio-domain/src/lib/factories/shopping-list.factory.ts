import { Factory } from '@toxictoast/azkaban-base-domain';
import { ShoppingListAnemic } from '../anemics';
import { ShoppingListAggregate } from '../aggregates';
import { ShoppingListData } from '../data';
import { ItemId, ItemVariantId, ShoppingListId } from '../valueObjects';

export class ShoppingListFactory
	implements
		Factory<ShoppingListAnemic, ShoppingListAggregate, ShoppingListData>
{
	reconstitute(data: ShoppingListAnemic): ShoppingListAggregate {
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

		const shoppingListId = new ShoppingListId(id);
		const itemId = new ItemId(item_id);
		const variantId = new ItemVariantId(variant_id);

		return new ShoppingListAggregate(
			shoppingListId.value,
			itemId.value,
			variantId.value,
			current_sku,
			min_sku,
			max_sku,
			created_at,
			updated_at,
			deleted_at,
		);
	}

	constitute(data: ShoppingListAggregate): ShoppingListAnemic {
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
			isUpdated,
			isDeleted,
		} = data.toAnemic();

		const shoppingListId = new ShoppingListId(id);
		const itemId = new ItemId(item_id);
		const variantId = new ItemVariantId(variant_id);

		return {
			id: shoppingListId.value,
			item_id: itemId.value,
			variant_id: variantId.value,
			current_sku,
			min_sku,
			max_sku,
			created_at,
			updated_at,
			deleted_at,
			isUpdated,
			isDeleted,
		};
	}

	createDomain(data: ShoppingListData): ShoppingListAggregate {
		const { item_id, variant_id, current_sku, min_sku, max_sku } = data;

		const id = new ShoppingListId();
		const itemId = new ItemId(item_id);
		const variantId = new ItemVariantId(variant_id);

		return new ShoppingListAggregate(
			id.value,
			itemId.value,
			variantId.value,
			current_sku,
			min_sku,
			max_sku,
			new Date(),
			null,
			null,
		);
	}
}
