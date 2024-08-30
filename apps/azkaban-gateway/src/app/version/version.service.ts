import { Inject, Injectable } from '@nestjs/common';
import { FoodfolioVersionsService } from './foodfolio-versions.service';
import { NotifyVersionsService } from './notify-versions.service';
import { AzkabanVersionsService } from './azkaban-versions.service';

@Injectable()
export class VersionService {
	constructor(
		private readonly foodfolio: FoodfolioVersionsService,
		private readonly notify: NotifyVersionsService,
		private readonly azkaban: AzkabanVersionsService,
		//
		@Inject('APP_VERSION') private readonly appVersion: string,
	) {}

	getGatewayVersion() {
		return {
			gateway: this.appVersion,
		};
	}

	async getFoodfolioVersions() {
		return await this.foodfolio.getFoodfolioVersions();
	}

	async getNotifyVersions() {
		return await this.notify.getNotifyVersions();
	}

	async getAzkabanVersions() {
		return await this.azkaban.getAzkabanVersions();
	}
}
