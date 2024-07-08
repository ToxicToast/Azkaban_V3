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
            const limitNumber = limit ?? 50;
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
    @Get('category/:id')
    async getItemsByCategoryId(@Param('id') id: string) {
        try {
            return await this.service.getItemByCategoryId(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('location/:id')
    async getItemsByLocationId(@Param('id') id: string) {
        try {
            return await this.service.getItemByLocationId(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('company/:id')
    async getItemsByCompanyId(@Param('id') id: string) {
        try {
            return await this.service.getItemByCompanyId(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('size/:id')
    async getItemsBySizeId(@Param('id') id: string) {
        try {
            return await this.service.getItemBySizeId(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('type/:id')
    async getItemsByTypeId(@Param('id') id: string) {
        try {
            return await this.service.getItemByTypeId(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('warehouse/:id')
    async getItemsByWarehouseId(@Param('id') id: string) {
        try {
            return await this.service.getItemByWarehouseId(id);
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
        @Body('category_id') category_id: Nullable<string>,
        @Body('location_id') location_id: Nullable<string>,
        @Body('company_id') company_id: Nullable<string>,
        @Body('size_id') size_id: Nullable<string>,
        @Body('type_id') type_id: Nullable<string>,
        @Body('warehouse_id') warehouse_id: Nullable<string>,
        @Body('title') title: string,
        @Body('current_sku') current_sku: number,
        @Body('min_sku') min_sku: number,
        @Body('max_sku') max_sku: number,
        @Body('ean') ean: Nullable<string>,
        @Body('price') price: Nullable<number>,
    ) {
        try {
            return await this.service.createItem(
                category_id,
                location_id,
                company_id,
                size_id,
                type_id,
                warehouse_id,
                title,
                current_sku,
                min_sku,
                max_sku,
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
    async updateItem(
        @Param('id') id: string,
        @Body('category_id') category_id?: Optional<Nullable<string>>,
        @Body('location_id') location_id?: Optional<Nullable<string>>,
        @Body('company_id') company_id?: Optional<Nullable<string>>,
        @Body('size_id') size_id?: Optional<Nullable<string>>,
        @Body('type_id') type_id?: Optional<Nullable<string>>,
        @Body('warehouse_id') warehouse_id?: Optional<Nullable<string>>,
        @Body('title') title?: Optional<string>,
        @Body('current_sku') current_sku?: Optional<number>,
        @Body('min_sku') min_sku?: Optional<number>,
        @Body('max_sku') max_sku?: Optional<number>,
        @Body('ean') ean?: Optional<Nullable<string>>,
        @Body('price') price?: Optional<Nullable<number>>,
        @Body('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateItem(
                id,
                category_id,
                location_id,
                company_id,
                size_id,
                type_id,
                warehouse_id,
                title,
                current_sku,
                min_sku,
                max_sku,
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
