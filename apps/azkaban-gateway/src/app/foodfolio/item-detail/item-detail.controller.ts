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
import { ItemDetailService } from './item-detail.service';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/item-detail')
export class ItemDetailController {
	constructor(private readonly service: ItemDetailService) {}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get()
	async getItems(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		try {
			const limitNumber = limit ?? 50;
			const offsetNumber = offset ?? 0;
			return await this.service.getItemDetails(limitNumber, offsetNumber);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('item/:id')
	async getItemsByItemId(@Param('id') id: string) {
		try {
			return await this.service.getItemDetailByItemId(id);
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
			return await this.service.getItemDetailById(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Post()
	async createItemDetail(
		@Body('item_id') item_id: string,
		@Body('purchase_date') purchase_date: Date,
		@Body('expiration_date') expiration_date: Nullable<Date>,
		@Body('returnable') returnable: boolean,
		@Body('art_no') art_no: Nullable<string>,
	) {
		try {
			return await this.service.createItemDetail(
				item_id,
				purchase_date,
				expiration_date,
				returnable,
				art_no,
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
	async updateItemDetail(
		@Param('id') id: string,
		@Body('item_id') item_id?: Optional<string>,
		@Body('purchase_date') purchase_date?: Optional<Date>,
		@Body('expiration_date') expiration_date?: Optional<Nullable<Date>>,
		@Body('opening_date') opening_date?: Optional<Nullable<Date>>,
		@Body('returnable') returnable?: Optional<boolean>,
		@Body('activated_at') activated_at?: Optional<Date>,
		@Body('art_no') art_no?: Optional<Nullable<string>>,
	) {
		try {
			return await this.service.updateItemDetail(
				id,
				item_id,
				purchase_date,
				expiration_date,
				opening_date,
				returnable,
				activated_at,
				art_no,
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
	async deleteItemDetail(@Param('id') id: string) {
		try {
			return await this.service.deleteItemDetail(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Put('restore/:id')
	async restoreItemDetail(@Param('id') id: string) {
		try {
			return await this.service.restoreItemDetail(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
