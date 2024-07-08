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
import { TypeService } from './type.service';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/type')
export class TypeController {
    constructor(private readonly service: TypeService) {}

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get()
    async getTypes(
        @Query('limit') limit?: Optional<number>,
        @Query('offset') offset?: Optional<number>,
    ) {
        try {
            const limitNumber = limit ?? 50;
            const offsetNumber = offset ?? 0;
            return await this.service.getTypes(limitNumber, offsetNumber);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Get('id/:id')
    async getTypeById(@Param('id') id: string) {
        try {
            return await this.service.getTypeById(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Post()
    async createType(@Body('title') title: string) {
        try {
            return await this.service.createType(title);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Put(':id')
    async updateType(
        @Param('id') id: string,
        @Body('title') title?: Optional<string>,
        @Body('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateType(id, title, activated_at);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Delete(':id')
    async deleteType(@Param('id') id: string) {
        try {
            return await this.service.deleteType(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
    @Put('restore/:id')
    async restoreType(@Param('id') id: string) {
        try {
            return await this.service.restoreType(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }
}
