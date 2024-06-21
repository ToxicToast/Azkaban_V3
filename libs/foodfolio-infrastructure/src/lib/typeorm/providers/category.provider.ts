import { CategoryEntity } from '../entities';

export const categoryProvider = [
    {
        provide: 'CATEGORY_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(CategoryEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
