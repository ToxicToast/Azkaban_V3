import { Module } from '@nestjs/common';
import { AlertsModule } from '../alerts.module';
import { TwitchAlertsService } from './twitch-alerts.service';
import { TwitchAlertsController } from './twitch-alerts.controller';

@Module({
	imports: [AlertsModule],
	controllers: [TwitchAlertsController],
	providers: [TwitchAlertsService],
})
export class TwitchAlertsModule {}
