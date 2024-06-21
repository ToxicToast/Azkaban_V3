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
import { CategoryService } from './category.service';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/category')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

    @Groups('Admin')
    @Get()
    async getCategories(
        @Query('limit') limit?: Optional<number>,
        @Query('offset') offset?: Optional<number>,
    ) {
        try {
            const limitNumber = limit ?? 50;
            const offsetNumber = offset ?? 0;
            return await this.service.getCategories(limitNumber, offsetNumber);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups('Admin')
    @Get('parent/:id')
    async getGroupByParentId(@Param('id') id: string) {
        try {
            return await this.service.getCategoryByParentId(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups('Admin')
    @Get('id/:id')
    async getGroupById(@Param('id') id: string) {
        try {
            return await this.service.getCategoryById(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups('Admin')
    @Post()
    async createCategory(
        @Body('title') title: string,
        @Body('parent_id') parent_id?: Optional<Nullable<string>>,
    ) {
        try {
            return await this.service.createCategory(title, parent_id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups('Admin')
    @Put(':id')
    async updateCategory(
        @Param('id') id: string,
        @Body('title') title?: Optional<string>,
        @Body('parent_id') parent_id?: Optional<Nullable<string>>,
        @Body('activated_at') activated_at?: Optional<Nullable<Date>>,
    ) {
        try {
            return await this.service.updateCategory(
                id,
                title,
                parent_id,
                activated_at,
            );
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups('Admin')
    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        try {
            return await this.service.deleteCategory(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }

    @Groups('Admin')
    @Put('restore/:id')
    async restoreGroup(@Param('id') id: string) {
        try {
            return await this.service.restoreCategory(id);
        } catch (error) {
            throw new HttpException(
                error.message ?? 'Unknown Error',
                error.status ?? 500,
            );
        }
    }
}
