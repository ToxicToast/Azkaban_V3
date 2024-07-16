import { ItemDetailEntity } from '../entities';

export const itemDetailProvider = [
    {
        provide: 'ITEM_DETAIL_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(ItemDetailEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
