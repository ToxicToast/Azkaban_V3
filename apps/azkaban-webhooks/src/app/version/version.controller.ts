import { Controller, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VersionService } from './version.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class VersionController {
  constructor(private readonly service: VersionService) {}

  @MessagePattern('azkaban.notify.version')
  async getVersion() {
    return this.service.getVersion();
  }
}
