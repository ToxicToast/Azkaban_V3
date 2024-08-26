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
import { AuthGuard, GroupsGuard } from '../../../guards';
import { Groups } from '../../../decorators';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { ItemService } from './item.service';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/item')
export class ItemController {
	constructor(private readonly service: ItemService) {}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get()
	async getItems(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		try {
			const limitNumber = limit ?? 0;
			const offsetNumber = offset ?? 0;
			return await this.service.getItems(limitNumber, offsetNumber);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('id/:id')
	async getItemById(@Param('id') id: string) {
		try {
			return await this.service.getItemById(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Post()
	async createItem(
		@Body('title') title: string,
		@Body('current_sku') current_sku: number,
		@Body('min_sku') min_sku: number,
		@Body('max_sku') max_sku: number,
	) {
		try {
			return await this.service.createItem(
				title,
				current_sku,
				min_sku,
				max_sku,
			);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Put(':id')
	async updateItem(
		@Param('id') id: string,
		@Body('title') title?: Optional<string>,
		@Body('current_sku') current_sku?: Optional<number>,
		@Body('min_sku') min_sku?: Optional<number>,
		@Body('max_sku') max_sku?: Optional<number>,
		@Body('activated_at') activated_at?: Optional<Nullable<Date>>,
	) {
		try {
			return await this.service.updateItem(
				id,
				title,
				current_sku,
				min_sku,
				max_sku,
				activated_at,
			);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Delete(':id')
	async deleteItem(@Param('id') id: string) {
		try {
			return await this.service.deleteItem(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Put('restore/:id')
	async restoreItem(@Param('id') id: string) {
		try {
			return await this.service.restoreItem(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
