import { UserEntity } from '../entities';

export const userProvider = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource) => {
            return dataSource.getRepository(UserEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
