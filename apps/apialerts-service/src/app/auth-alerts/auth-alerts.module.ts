import { Module } from '@nestjs/common';
import { AuthAlertsController } from './auth-alerts.controller';
import { AlertsModule } from '../alerts.module';
import { AuthAlertsService } from './auth-alerts.service';

@Module({
	imports: [AlertsModule],
	controllers: [AuthAlertsController],
	providers: [AuthAlertsService],
})
export class AuthAlertsModule {}
