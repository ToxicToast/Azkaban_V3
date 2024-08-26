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
import { UserGroups } from '@toxictoast/azkaban-base-helpers';
import { Optional } from '@toxictoast/azkaban-base-types';
import { ShoppingListService } from './shopping-list.service';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/shopping-list')
export class ShoppingListController {
	constructor(private readonly service: ShoppingListService) {}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get()
	async getShoppingLists(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		try {
			const limitNumber = limit ?? 0;
			const offsetNumber = offset ?? 0;
			return await this.service.getShoppingLists(
				limitNumber,
				offsetNumber,
			);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('id/:id')
	async getShoppingListById(@Param('id') id: string) {
		try {
			return await this.service.getShoppingListById(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('item/:id')
	async getShoppingListByItemId(@Param('id') id: string) {
		try {
			return await this.service.getShoppingListByItemId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Post()
	async createShoppingList(
		@Body('item_id') item_id: string,
		@Body('variant_id') variant_id: string,
		@Body('current_sku') current_sku: number,
		@Body('min_sku') min_sku: number,
		@Body('max_sku') max_sku: number,
	) {
		try {
			return await this.service.createShoppingList(
				item_id,
				variant_id,
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
	@Delete(':id')
	async deleteShoppingList(@Param('id') id: string) {
		try {
			return await this.deleteShoppingList(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Put('restore/:id')
	async restoreShoppingList(@Param('id') id: string) {
		try {
			return await this.service.restoreShoppingList(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
