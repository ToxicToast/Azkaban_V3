import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { CircuitBreakerModule } from '../circuitbreaker/circuitbreaker.module';

@Module({
  imports: [CircuitBreakerModule],
  controllers: [VersionController],
  providers: [
    VersionService,
    {
      provide: 'APP_VERSION',
      useValue: process.env.APP_VERSION,
    },
  ],
})
export class VersionModule {}
