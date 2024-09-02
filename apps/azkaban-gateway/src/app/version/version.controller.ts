import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VersionService } from './version.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('monitoring')
@UseGuards(ThrottlerGuard)
@Controller('version')
export class VersionController {
	constructor(private readonly service: VersionService) {}

	@Get()
	async getVersion() {
		try {
			const gateway = this.service.getGatewayVersion();
			const core = await this.service.getAzkabanVersions();
			//
			return {
				...gateway,
				azkaban: {
					notify: await this.service.getNotifyVersions(),
					...core,
				},
				foodfolio: await this.service.getFoodfolioVersions(),
			};
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
