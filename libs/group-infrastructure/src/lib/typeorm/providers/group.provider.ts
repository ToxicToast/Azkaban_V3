import { GroupEntity } from '../entities';

export const groupProvider = [
  {
    provide: 'GROUP_REPOSITORY',
    useFactory: (dataSource) => {
      return dataSource.getRepository(GroupEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
