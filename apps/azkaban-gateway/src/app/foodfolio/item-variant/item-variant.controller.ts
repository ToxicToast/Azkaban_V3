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
import { ItemVariantService } from './item-variant.service';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/item-variant')
export class ItemVariantController {
	constructor(private readonly service: ItemVariantService) {}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get()
	async getItemVariants(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		try {
			const limitNumber = limit ?? 0;
			const offsetNumber = offset ?? 0;
			return await this.service.getItemVariants(
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
	@Get('item/:id')
	async getItemVariantsByItemId(@Param('id') id: string) {
		try {
			return await this.service.getItemVariantByItemId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('category/:id')
	async getItemVariantsByCategoryId(@Param('id') id: string) {
		try {
			return await this.service.getItemVariantByCategoryId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('location/:id')
	async getItemVariantsByLocationId(@Param('id') id: string) {
		try {
			return await this.service.getItemVariantByLocationId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('company/:id')
	async getItemVariantsByCompanyId(@Param('id') id: string) {
		try {
			return await this.service.getItemVariantByCompanyId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('size/:id')
	async getItemVariantsBySizeId(@Param('id') id: string) {
		try {
			return await this.service.getItemVariantBySizeId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('type/:id')
	async getItemVariantsByTypeId(@Param('id') id: string) {
		try {
			return await this.service.getItemVariantByTypeId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('warehouse/:id')
	async getItemVariantsByWarehouseId(@Param('id') id: string) {
		try {
			return await this.service.getItemVariantByWarehouseId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('id/:id')
	async getItemVariantById(@Param('id') id: string) {
		try {
			return await this.service.getItemVariantById(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Post()
	async createItemVariant(
		@Body('item_id') item_id: Nullable<string>,
		@Body('category_id') category_id: Nullable<string>,
		@Body('location_id') location_id: Nullable<string>,
		@Body('company_id') company_id: Nullable<string>,
		@Body('size_id') size_id: Nullable<string>,
		@Body('type_id') type_id: Nullable<string>,
		@Body('warehouse_id') warehouse_id: Nullable<string>,
		@Body('title') title: string,
		@Body('sku') sku: number,
		@Body('ean') ean: Nullable<string>,
		@Body('price') price: Nullable<number>,
	) {
		try {
			return await this.service.createItemVariant(
				item_id,
				category_id,
				location_id,
				company_id,
				size_id,
				type_id,
				warehouse_id,
				title,
				sku,
				ean,
				price,
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
	async updateItemVariant(
		@Param('id') id: string,
		@Body('item_id') item_id?: Optional<Nullable<string>>,
		@Body('category_id') category_id?: Optional<Nullable<string>>,
		@Body('location_id') location_id?: Optional<Nullable<string>>,
		@Body('company_id') company_id?: Optional<Nullable<string>>,
		@Body('size_id') size_id?: Optional<Nullable<string>>,
		@Body('type_id') type_id?: Optional<Nullable<string>>,
		@Body('warehouse_id') warehouse_id?: Optional<Nullable<string>>,
		@Body('title') title?: Optional<string>,
		@Body('sku') sku?: Optional<number>,
		@Body('ean') ean?: Optional<Nullable<string>>,
		@Body('price') price?: Optional<Nullable<number>>,
		@Body('activated_at') activated_at?: Optional<Nullable<Date>>,
	) {
		try {
			return await this.service.updateItemVariant(
				id,
				item_id,
				category_id,
				location_id,
				company_id,
				size_id,
				type_id,
				warehouse_id,
				title,
				sku,
				ean,
				price,
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
	async deleteItemVariant(@Param('id') id: string) {
		try {
			return await this.service.deleteItemVariant(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Put('restore/:id')
	async restoreItemVariant(@Param('id') id: string) {
		try {
			return await this.service.restoreItemVariant(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
