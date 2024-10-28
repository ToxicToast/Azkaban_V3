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
import { CharacterService } from './character.service';
import { Groups } from '../../../decorators';
import { UserGroups } from '@toxictoast/azkaban-base-helpers';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard, GroupsGuard } from '../../../guards';
import { Optional } from '@toxictoast/azkaban-base-types';

@ApiTags('warcraft')
@UseGuards(ThrottlerGuard, AuthGuard, GroupsGuard)
@Controller('warcraft/character')
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@Groups(UserGroups.WARCRAFT, UserGroups.WARCRAFT_ADMIN, UserGroups.ADMIN)
	@Get()
	async getCharacters(
		@Query('limit') limit?: Optional<number>,
		@Query('offset') offset?: Optional<number>,
	) {
		try {
			const limitNumber = limit ?? 0;
			const offsetNumber = offset ?? 0;
			return await this.service.getCharacters(limitNumber, offsetNumber);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.WARCRAFT, UserGroups.WARCRAFT_ADMIN, UserGroups.ADMIN)
	@Get('id/:id')
	async getCharacterById(@Param('id') id: string) {
		try {
			return await this.service.getCharacterById(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.WARCRAFT, UserGroups.WARCRAFT_ADMIN, UserGroups.ADMIN)
	@Get('userid/:id')
	async getCharacterByUserId(@Param('id') id: string) {
		try {
			return await this.service.getCharacterByUserId(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.WARCRAFT_ADMIN, UserGroups.ADMIN)
	@Post()
	async createCharacter(
		@Body('region') region: string,
		@Body('realm') realm: string,
		@Body('name') name: string,
	) {
		try {
			return await this.service.createCharacter(region, realm, name);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.WARCRAFT_ADMIN, UserGroups.ADMIN)
	@Put(':id')
	async updateCharacter(
		@Param('id') id: string,
		@Body('user_id') user_id?: Optional<string>,
		@Body('gender') gender?: Optional<string>,
		@Body('faction') faction?: Optional<string>,
		@Body('race') race?: Optional<number>,
		@Body('character_class') character_class?: Optional<number>,
		@Body('active_spec') active_spec?: Optional<number>,
		@Body('level') level?: Optional<number>,
		@Body('item_level') item_level?: Optional<number>,
	) {
		try {
			return await this.service.updateCharacter(
				id,
				user_id,
				gender,
				faction,
				race,
				character_class,
				active_spec,
				level,
				item_level,
			);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.WARCRAFT_ADMIN, UserGroups.ADMIN)
	@Delete(':id')
	async deleteCharacter(@Param('id') id: string) {
		try {
			return await this.service.deleteCharacter(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}

	@Groups(UserGroups.WARCRAFT_ADMIN, UserGroups.ADMIN)
	@Put('restore/:id')
	async restoreCharacter(@Param('id') id: string) {
		try {
			return await this.service.restoreCharacter(id);
		} catch (error) {
			throw new HttpException(
				error.message ?? 'Unknown Error',
				error.status ?? 500,
			);
		}
	}
}
