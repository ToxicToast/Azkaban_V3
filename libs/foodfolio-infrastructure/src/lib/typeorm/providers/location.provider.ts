import { LocationEntity } from '../entities';

export const locationProvider = [
    {
        provide: 'LOCATION_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(LocationEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
