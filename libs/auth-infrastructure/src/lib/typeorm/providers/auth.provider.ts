import { AuthEntity } from '../entities';

export const authProvider = [
  {
    provide: 'AUTH_REPOSITORY',
    useFactory: (dataSource) => {
      return dataSource.getRepository(AuthEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
