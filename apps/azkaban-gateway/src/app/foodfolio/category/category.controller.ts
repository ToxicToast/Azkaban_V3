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
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/category')
export class CategoryController {
	constructor(private readonly service: CategoryService) {}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get()
	async getCategories(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		try {
			const limitNumber = limit ?? 0;
			const offsetNumber = offset ?? 0;
			return await this.service.getCategories(limitNumber, offsetNumber);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('parent/:id')
	async getCategoryByParentId(@Param('id') id: string) {
		try {
			return await this.service.getCategoryByParentId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('id/:id')
	async getCategoryById(@Param('id') id: string) {
		try {
			return await this.service.getCategoryById(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
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

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
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

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
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

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Put('restore/:id')
	async restoreCategory(@Param('id') id: string) {
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
