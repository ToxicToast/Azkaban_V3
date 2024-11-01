import { CharacterEntity } from '../entities';

export const characterProvider = [
	{
		provide: 'CHARACTER_REPOSITORY',
		useFactory: (dataSource) => {
			return dataSource.getRepository(CharacterEntity);
		},
		inject: ['DATA_SOURCE'],
	},
];
