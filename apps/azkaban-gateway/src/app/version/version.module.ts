import { Module } from '@nestjs/common';
import { VersionController } from './version.controller';
import { VersionService } from './version.service';
import { ConfigService } from '@nestjs/config';
import { NotifyServiceModule } from '../core/notifiy-service.module';
import { UserServiceModule } from '../core/user-service.module';
import { AuthServiceModule } from '../core/auth-service.module';
import { GroupsServiceModule } from '../core/groups-service.module';
import { FoodfolioCategoryServiceModule } from '../core/foodfolio-category-service.module';
import { FoodfolioCompanyServiceModule } from '../core/foodfolio-company-service.module';
import { FoodfolioLocationServiceModule } from '../core/foodfolio-location-service.module';
import { FoodfolioSizeServiceModule } from '../core/foodfolio-size-service.module';
import { FoodfolioTypeServiceModule } from '../core/foodfolio-type-service.module';
import { FoodfolioItemServiceModule } from '../core/foodfolio-item-service.module';
import { FoodfolioItemDetailServiceModule } from '../core/foodfolio-item-detail-service.module';
import { FoodfolioItemVariantServiceModule } from '../core/foodfolio-item-variant-service.module';
import { FoodfolioWarehouseServiceModule } from '../core/foodfolio-warehouse-service.module';
import { FoodfolioShoppingListServiceModule } from '../core/foodfolio-shopping-list-service.module';
import { WebhookServiceModule } from '../core/webhook-service.module';
import { SSEServiceModule } from '../core/sse-service.module';
import { ApiAlertsServiceModule } from '../core/apialerts-service.module';
import { CronjobServiceModule } from '../core/cronjob-service.module';
import { NotificationsServiceModule } from '../core/notifications-service.module';
import { FoodfolioVersionsService } from './foodfolio-versions.service';
import { NotifyVersionsService } from './notify-versions.service';
import { AzkabanVersionsService } from './azkaban-versions.service';
import { TwitchBotServiceModule } from '../core/twitch-bot-service.module';
import { TwitchVersionsService } from './twitch-versions.service';
import { TwitchViewerServiceModule } from '../core/twitch-viewer-service.module';
import { TwitchMessageServiceModule } from '../core/twitch-message-service.module';
import { CachingModule } from '../core/caching.module';
import { WarcraftCharacterServiceModule } from '../core/warcraft-character-service.module';
import { WarcraftVersionsService } from './warcraft-versions.service';

@Module({
	imports: [
		CachingModule,
		// Azkaban Services
		UserServiceModule,
		AuthServiceModule,
		GroupsServiceModule,
		CronjobServiceModule,
		// Foodfolio Services
		FoodfolioCategoryServiceModule,
		FoodfolioCompanyServiceModule,
		FoodfolioLocationServiceModule,
		FoodfolioSizeServiceModule,
		FoodfolioTypeServiceModule,
		FoodfolioItemServiceModule,
		FoodfolioItemDetailServiceModule,
		FoodfolioItemVariantServiceModule,
		FoodfolioWarehouseServiceModule,
		FoodfolioShoppingListServiceModule,
		// Notification Services
		WebhookServiceModule,
		SSEServiceModule,
		ApiAlertsServiceModule,
		NotifyServiceModule,
		NotificationsServiceModule,
		// Twitch Services
		TwitchBotServiceModule,
		TwitchViewerServiceModule,
		TwitchMessageServiceModule,
		// Warcraft Services
		WarcraftCharacterServiceModule,
	],
	controllers: [VersionController],
	providers: [
		VersionService,
		FoodfolioVersionsService,
		NotifyVersionsService,
		AzkabanVersionsService,
		TwitchVersionsService,
		WarcraftVersionsService,
		{
			provide: 'APP_VERSION',
			useFactory: (config: ConfigService) => {
				return config.get('APP_VERSION', 'local');
			},
			inject: [ConfigService],
		},
	],
})
export class VersionModule {}
