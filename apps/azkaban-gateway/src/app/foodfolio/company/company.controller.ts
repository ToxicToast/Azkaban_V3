import { ApiTags } from '@nestjs/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Logger,
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
import { CompanyService } from './company.service';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';

@ApiTags('foodfolio')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('foodfolio/company')
export class CompanyController {
	constructor(private readonly service: CompanyService) {}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get()
	async getCompanies(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		try {
			const limitNumber = limit ?? 0;
			const offsetNumber = offset ?? 0;
			return await this.service.getCompanies(limitNumber, offsetNumber);
		} catch (error) {
			Logger.error(error);
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO, UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Get('id/:id')
	async getCompanyById(@Param('id') id: string) {
		try {
			return await this.service.getCompanyById(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Post()
	async createCompany(@Body('title') title: string) {
		try {
			return await this.service.createCompany(title);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Put(':id')
	async updateCompany(
		@Param('id') id: string,
		@Body('title') title?: Optional<string>,
		@Body('activated_at') activated_at?: Optional<Nullable<Date>>,
	) {
		try {
			return await this.service.updateCompany(id, title, activated_at);
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
			return await this.service.deleteCompany(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.FOODFOLIO_ADMIN, UserGroups.ADMIN)
	@Put('restore/:id')
	async restoreGroup(@Param('id') id: string) {
		try {
			return await this.service.restoreCompany(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
