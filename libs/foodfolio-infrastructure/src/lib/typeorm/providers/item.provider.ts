import { ItemEntity } from '../entities';

export const itemProvider = [
    {
        provide: 'ITEM_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(ItemEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
