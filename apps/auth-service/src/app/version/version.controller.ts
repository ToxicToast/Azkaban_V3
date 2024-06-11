import { Controller } from '@nestjs/common';
import { VersionService } from './version.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthTopics } from '@toxictoast/azkaban-broker-rabbitmq';

@Controller('version')
export class VersionController {
    constructor(private readonly service: VersionService) {}

    @MessagePattern(AuthTopics.VERSION)
    async getVersion() {
        return this.service.getVersion();
    }
}
