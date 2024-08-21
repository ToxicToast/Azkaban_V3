import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GroupsService } from './groups.service';
import { Optional } from '@toxictoast/azkaban-base-types';
import { AuthGuard, GroupsGuard } from '../../guards';
import { Groups } from '../../decorators';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('group')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('group')
export class GroupsController {
	constructor(private readonly service: GroupsService) {}

	@Groups(UserGroups.ADMIN)
	@Get()
	async getGroups(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		try {
			const limitNumber = limit ?? 0;
			const offsetNumber = offset ?? 0;
			return await this.service.getGroups(limitNumber, offsetNumber);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.ADMIN)
	@Get('id/:id')
	async getGroupById(@Param('id') id: string) {
		try {
			return await this.service.getGroupById(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.ADMIN)
	@Post()
	async createGroup(@Body('title') title: string) {
		try {
			return await this.service.createGroup(title);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.ADMIN)
	@Put(':id')
	async updateGroup(
		@Param('id') id: string,
		@Body('title') title?: Optional<string>,
		@Body('slug') slug?: Optional<string>,
		@Body('active') active?: Optional<boolean>,
	) {
		try {
			return await this.service.updateGroup(id, title, slug, active);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.ADMIN)
	@Delete(':id')
	async deleteGroup(@Param('id') id: string) {
		try {
			return await this.service.deleteGroup(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.ADMIN)
	@Put('restore/:id')
	async restoreGroup(@Param('id') id: string) {
		try {
			return await this.service.restoreGroup(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
