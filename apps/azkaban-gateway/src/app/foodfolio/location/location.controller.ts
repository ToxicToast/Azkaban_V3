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
import { LocationService } from './location.service';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/location')
export class LocationController {
    constructor(private readonly service: LocationService) {}

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get()
    async getLocations(
        @Query('limit') limit?: Optional<number>,
        @Query('offset') offset?: Optional<number>,
    ) {
        try {
            const limitNumber = limit ?? 50;
            const offsetNumber = offset ?? 0;
            return await this.service.getLocations(limitNumber, offsetNumber);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('parent/:id')
    async getLocationByParentId(@Param('id') id: string) {
        try {
            return await this.service.getLocationByParentId(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('freezer/:freezer')
    async getLocationByFreezer(@Param('freezer') freezer: boolean) {
        try {
            return await this.service.getLocationByFreezer(freezer);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('id/:id')
    async getLocationById(@Param('id') id: string) {
        try {
            return await this.service.getLocationById(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Post()
    async createLocation(
        @Body('title') title: string,
        @Body('freezer') freezer: boolean,
        @Body('parent_id') parent_id?: Optional<Nullable<string>>,
    ) {
        try {
            return await this.service.createLocation(title, freezer, parent_id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Put(':id')
    async updateLocation(
        @Param('id') id: string,
        @Body('title') title?: Optional<string>,
        @Body('parent_id') parent_id?: Optional<Nullable<string>>,
        @Body('freezer') freezer?: Optional<boolean>,
        @Body('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateLocation(
                id,
                title,
                parent_id,
                freezer,
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
    async deleteLocation(@Param('id') id: string) {
        try {
            return await this.service.deleteLocation(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Put('restore/:id')
    async restoreLocation(@Param('id') id: string) {
        try {
            return await this.service.restoreLocation(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }
}
