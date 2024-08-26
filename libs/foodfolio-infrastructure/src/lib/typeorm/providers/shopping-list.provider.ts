import { ShoppingListEntity } from '../entities';

export const shoppinglistProvider = [
	{
		provide: 'SHOPPINGLIST_REPOSITORY',
		useFactory: (dataSource) => {
			return dataSource.getRepository(ShoppingListEntity);
		},
		inject: ['DATA_SOURCE'],
	},
];
