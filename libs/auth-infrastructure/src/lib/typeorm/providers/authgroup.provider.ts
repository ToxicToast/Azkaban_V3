import { AuthGroupEntity } from '../entities';

export const authProvider = [
  {
    provide: 'AUTHGROUP_REPOSITORY',
    useFactory: (dataSource) => {
      return dataSource.getRepository(AuthGroupEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
