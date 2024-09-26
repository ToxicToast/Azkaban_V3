import { ViewerEntity } from '../entities';

export const viewerProvider = [
	{
		provide: 'VIEWER_REPOSITORY',
		useFactory: (dataSource) => {
			return dataSource.getRepository(ViewerEntity);
		},
		inject: ['DATA_SOURCE'],
	},
];
