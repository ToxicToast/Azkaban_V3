import { Controller } from '@nestjs/common';
import { VersionService } from './version.service';
import { MessagePattern } from '@nestjs/microservices';
import { WarcraftApiTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('version')
export class VersionController {
	constructor(private readonly service: VersionService) {}

	@MessagePattern(WarcraftApiTopics.VERSION)
	async getVersion() {
		return this.service.getVersion();
	}
}
