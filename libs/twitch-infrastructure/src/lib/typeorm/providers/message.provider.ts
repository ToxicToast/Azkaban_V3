import { MessageEntity } from '../entities';

export const messageProvider = [
	{
		provide: 'MESSAGE_REPOSITORY',
		useFactory: (dataSource) => {
			return dataSource.getRepository(MessageEntity);
		},
		inject: ['DATA_SOURCE'],
	},
];
