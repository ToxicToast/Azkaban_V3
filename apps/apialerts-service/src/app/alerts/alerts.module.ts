import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AuthAlertsService } from './auth-alerts.service';
import { AuthController } from './auth-controller';
import { ConfigService } from '@nestjs/config';
import { GroupAlertsService } from './group-alerts.service';
import { GroupController } from './group-controller';

@Module({
    controllers: [AuthController, GroupController],
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
