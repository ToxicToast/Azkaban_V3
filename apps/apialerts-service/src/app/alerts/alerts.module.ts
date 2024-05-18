import { Module } from '@nestjs/common';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { AuthAlertsService } from './auth-alerts.service';
import { AuthController } from './auth-controller';

@Module({
    controllers: [AlertsController, AuthController],
    providers: [
        {
            provide: 'MAGPIE_KEY',
            useValue: process.env.MAGPIE_KEY,
        },
        AlertsService,
        AuthAlertsService,
    ],
})
export class AlertsModule {}
