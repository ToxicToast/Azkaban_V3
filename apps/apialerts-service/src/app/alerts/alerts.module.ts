import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { AuthAlertsService } from './auth-alerts.service';
import { AuthController } from './auth-controller';
import { ConfigService } from '@nestjs/config';
import { GroupAlertsService } from './group-alerts.service';

@Module({
  controllers: [AlertsController, AuthController],
  providers: [
    {
      provide: 'MAGPIE_KEY',
      useFactory: (config: ConfigService) => {
        return config.get('MAGPIE_KEY', '-');
      },
      inject: [ConfigService],
    },
    AlertsService,
    AuthAlertsService,
    GroupAlertsService,
  ],
})
export class AlertsModule {}
