import { ItemVariantEntity } from '../entities';

export const itemVariantProvider = [
	{
		provide: 'ITEM_VARIANT_REPOSITORY',
		useFactory: (dataSource) => {
			return dataSource.getRepository(ItemVariantEntity);
		},
		inject: ['DATA_SOURCE'],
	},
];
