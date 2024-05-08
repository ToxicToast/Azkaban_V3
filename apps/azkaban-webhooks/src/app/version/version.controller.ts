import { Controller, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VersionService } from './version.service';

@Controller()
export class VersionController {
  constructor(private readonly service: VersionService) {}

  async getVersion() {
    return this.service.getVersion();
  }
}
