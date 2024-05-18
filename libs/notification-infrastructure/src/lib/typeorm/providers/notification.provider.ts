import { NotificationEntity } from '../entities';

export const notificationProvider = [
  {
    provide: 'NOTIFICATION_REPOSITORY',
    useFactory: (dataSource) => {
      return dataSource.getRepository(NotificationEntity);
    },
    inject: ['DATA_SOURCE'],
  },
];
