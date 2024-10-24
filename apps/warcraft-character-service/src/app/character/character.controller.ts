import { Controller } from '@nestjs/common';
import { CharacterService } from './character.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { WarcraftCharacterTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Controller('character')
export class CharacterController {
	constructor(private readonly service: CharacterService) {}

	@MessagePattern(WarcraftCharacterTopics.LIST)
	async getCharacterList(
		@Payload('limit') limit: number,
		@Payload('offset') offset: number,
	) {
		try {
			return await this.service.getList(limit, offset);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(WarcraftCharacterTopics.ID)
	async getCharacterById(@Payload('id') id: string) {
		try {
			return await this.service.getById(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(WarcraftCharacterTopics.USERID)
	async getCharacterByUserId(@Payload('user_id') user_id: Nullable<string>) {
		try {
			return await this.service.getByUserId(user_id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(WarcraftCharacterTopics.CREATE)
	async createCharacter(
		@Payload('region') region: string,
		@Payload('realm') realm: string,
		@Payload('name') name: string,
	) {
		try {
			return await this.service.createCharacter(region, realm, name);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(WarcraftCharacterTopics.UPDATE)
	async updateCharacter(
		@Payload('id') id: string,
		@Payload('user_id') user_id?: Optional<Nullable<string>>,
		@Payload('gender') gender?: Optional<string>,
		@Payload('faction') faction?: Optional<string>,
		@Payload('race') race?: Optional<number>,
		@Payload('character_class') character_class?: Optional<number>,
		@Payload('active_spec') active_spec?: Optional<number>,
		@Payload('guild') guild?: Optional<string>,
		@Payload('level') level?: Optional<number>,
		@Payload('item_level') item_level?: Optional<number>,
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
				guild,
				level,
				item_level,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(WarcraftCharacterTopics.DELETE)
	async deleteCharacter(@Payload('id') id: string) {
		try {
			return await this.service.deleteCharacter(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(WarcraftCharacterTopics.RESTORE)
	async restoreCharacter(@Payload('id') id: string) {
		try {
			return await this.service.restoreCharacter(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
