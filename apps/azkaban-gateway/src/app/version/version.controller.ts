import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VersionService } from './version.service';
import { ApiTags } from '@nestjs/swagger';
import { CachingService } from '../core/caching.service';

@ApiTags('monitoring')
@UseGuards(ThrottlerGuard)
@Controller('version')
export class VersionController {
	constructor(
		private readonly service: VersionService,
		private readonly cachingService: CachingService,
	) {}

	@Get()
	async getVersion() {
		const cacheKey = `azkaban_version:gateway`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			try {
				const gateway = this.service.getGatewayVersion();
				const core = await this.service.getAzkabanVersions();
				//
				const data = {
					...gateway,
					azkaban: {
						notify: await this.service.getNotifyVersions(),
						...core,
					},
					foodfolio: await this.service.getFoodfolioVersions(),
					twitch: await this.service.getTwitchVersions(),
				};
				await this.cachingService.setCache(cacheKey, data);
				return data;
			} catch (error) {
				throw new HttpException(
					error.message ?? 'Unknown Error',
					error.status ?? 500,
				);
			}
		}
		return await this.cachingService.getCache(cacheKey);
	}
}
