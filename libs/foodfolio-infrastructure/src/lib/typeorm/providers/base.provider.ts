import { buildDataSource } from '@toxictoast/azkaban-base-helpers';
import { ConfigService } from '@nestjs/config';

export const datasourceProvider = (entities = []) => [
	{
		provide: 'DATA_SOURCE',
		useFactory: (configService: ConfigService) => {
			const environment = configService.get<string>('NODE_ENV', 'dev');
			const type = configService.get<'postgres' | 'mariadb'>(
				'DATABASE_TYPE',
			);
			const hostname = configService.get<string>('DATABASE_HOST');
			const port = configService.get<number>('DATABASE_PORT');
			const username = configService.get<string>('DATABASE_USERNAME');
			const password = configService.get<string>('DATABASE_PASSWORD');
			const database = configService.get<string>('DATABASE_TABLE');
			//
			return buildDataSource(
				{
					environment,
					type,
					hostname,
					port,
					username,
					password,
					database,
				},
				entities,
			);
		},
		inject: [ConfigService],
	},
];
