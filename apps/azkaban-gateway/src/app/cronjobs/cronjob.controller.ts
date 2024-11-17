import { Controller, Post, UseGuards } from '@nestjs/common';
import { Groups } from '../../decorators';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';
import { ApiTags } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard, GroupsGuard } from '../../guards';
import { CronjobService } from './cronjob.service';

@ApiTags('cronjobs')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('cronjob')
export class CronjobController {
	constructor(private readonly service: CronjobService) {}

	@Groups(UserGroups.WARCRAFT_ADMIN, UserGroups.ADMIN)
	@Post('warcraft')
	async warcraftCronjob(): Promise<void> {
		await this.service.warcraftCronjob();
	}

	@Groups(UserGroups.TWITCH_ADMIN, UserGroups.ADMIN)
	@Post('viewer')
	async viewerCronjob(): Promise<void> {
		await this.service.viewerCronjob();
	}
}
