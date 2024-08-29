import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CachingService {
	constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
		Logger.debug('CachingService initialized');
		Logger.debug({
			cacheManager: this.cacheManager,
		});
	}

	async hasCache(key: string): Promise<boolean> {
		const data = await this.cacheManager
			.get(key)
			.catch((error) => Logger.error(error));
		return data !== undefined;
	}

	async getCache<T>(key: string): Promise<T> {
		try {
			return await this.cacheManager.get<T>(key);
		} catch (e) {
			Logger.error(e);
			return null;
		}
	}

	async setCache<T>(key: string, value: T): Promise<void> {
		await this.cacheManager
			.set(key, value)
			.catch((error) => Logger.error(error));
	}

	async removeCache(key: string): Promise<void> {
		await this.cacheManager.del(key);
	}
}
