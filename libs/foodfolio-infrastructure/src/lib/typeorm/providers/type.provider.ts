import { TypeEntity } from '../entities';

export const typeProvider = [
    {
        provide: 'TYPE_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(TypeEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
