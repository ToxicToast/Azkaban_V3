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
import { WarehouseService } from './warehouse.service';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/warehouse')
export class WarehouseController {
    constructor(private readonly service: WarehouseService) {}

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get()
    async getWarehouses(
        @Query('limit') limit?: Optional<number>,
        @Query('offset') offset?: Optional<number>,
    ) {
        try {
            const limitNumber = limit ?? 50;
            const offsetNumber = offset ?? 0;
            return await this.service.getWarehouses(limitNumber, offsetNumber);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('id/:id')
    async getWarehouseById(@Param('id') id: string) {
        try {
            return await this.service.getWarehouseById(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Post()
    async createWarehouse(@Body('title') title: string) {
        try {
            return await this.service.createWarehouse(title);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Put(':id')
    async updateWarehouse(
        @Param('id') id: string,
        @Body('title') title?: Optional<string>,
        @Body('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateWarehouse(id, title, activated_at);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Delete(':id')
    async deleteWarehouse(@Param('id') id: string) {
        try {
            return await this.service.deleteWarehouse(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Put('restore/:id')
    async restoreWarehouse(@Param('id') id: string) {
        try {
            return await this.service.restoreWarehouse(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }
}
