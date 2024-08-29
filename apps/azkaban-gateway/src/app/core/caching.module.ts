import { Module } from '@nestjs/common';
import { CachingService } from './caching.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		CacheModule.registerAsync({
			useFactory: async (config: ConfigService) => {
				const host = config.get('REDIS_HOST', 'localhost');
				const port = config.get('REDIS_PORT', 6379);
				const password = config.get('REDIS_PASSWORD', 'supersecret');
				const store = await redisStore({
					url: `redis://${host}:${port}`,
					password,
					ttl: 300 * 1000,
				});
				return {
					store,
					isGlobal: true,
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [CachingService],
	exports: [CacheModule, CachingService],
})
export class CachingModule {}
