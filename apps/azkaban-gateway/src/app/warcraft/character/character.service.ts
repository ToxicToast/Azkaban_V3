import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NotifyService } from '../notify.service';
import { CachingService } from '../../core/caching.service';
import { CharacterDAO } from '@azkaban/warcraft-infrastructure';
import {
	RmqRecordBuilderHelper,
	WarcraftCharacterTopics,
} from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class CharacterService {
	constructor(
		@Inject('WARCRAFT_CHARACTER_SERVICE')
		private readonly client: ClientProxy,
		private readonly notifySerivce: NotifyService,
		private readonly cachingService: CachingService,
	) {}

	async getCharacters(
		limit: number,
		offset: number,
	): Promise<Array<CharacterDAO>> {
		const cacheKey = `${WarcraftCharacterTopics.LIST}:${limit}:${offset}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				limit,
				offset,
			});
			const data = await this.client
				.send(WarcraftCharacterTopics.LIST, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
	}

	async getCharacterById(id: string): Promise<CharacterDAO> {
		const cacheKey = `${WarcraftCharacterTopics.ID}:${id}`;
		const inCache = await this.cachingService.hasCache(cacheKey);
		if (!inCache) {
			const payload = RmqRecordBuilderHelper({
				id,
			});
			const data = await this.client
				.send(WarcraftCharacterTopics.ID, payload)
				.toPromise();
			await this.cachingService.setCache(cacheKey, data);
			return data;
		}
		return await this.cachingService.getCache(cacheKey);
	}

	async createCharacter(
		region: string,
		realm: string,
		name: string,
	): Promise<CharacterDAO> {
		const payload = RmqRecordBuilderHelper({
			region,
			realm,
			name,
		});
		return await this.client
			.send(WarcraftCharacterTopics.CREATE, payload)
			.toPromise()
			.then(async (character: CharacterDAO) => {
				await this.notifySerivce.onCreateCharacter(
					character.id,
					character.region,
					character.realm,
					character.name,
				);
				await this.cachingService.removeCache(
					`${WarcraftCharacterTopics.LIST}:0:0`,
				);
				return character;
			})
			.catch(async (error) => {
				throw error;
			});
	}

	async updateCharacter(
		id: string,
		gender?: Optional<string>,
		faction?: Optional<string>,
		race?: Optional<number>,
		character_class?: Optional<number>,
		active_spec?: Optional<number>,
		guild?: Optional<string>,
		level?: Optional<number>,
		item_level?: Optional<number>,
	): Promise<CharacterDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
			gender,
			faction,
			race,
			character_class,
			active_spec,
			guild,
			level,
			item_level,
		});
		return await this.client
			.send(WarcraftCharacterTopics.UPDATE, payload)
			.toPromise();
	}

	async deleteCharacter(id: string): Promise<CharacterDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(WarcraftCharacterTopics.DELETE, payload)
			.toPromise();
	}

	async restoreCharacter(id: string): Promise<CharacterDAO> {
		const payload = RmqRecordBuilderHelper({
			id,
		});
		return await this.client
			.send(WarcraftCharacterTopics.RESTORE, payload)
			.toPromise();
	}
}
