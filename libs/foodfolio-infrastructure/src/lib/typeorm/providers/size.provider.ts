import { SizeEntity } from '../entities';

export const sizeProvider = [
    {
        provide: 'SIZE_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(SizeEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
