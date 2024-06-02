import { UserEntity } from '@azkaban/user-infrastructure';

export const authProvider = [
  {
    provide: 'AUTH_REPOSITORY',
    useFactory: (dataSource) => {
      return dataSource.getRepository(UserEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
