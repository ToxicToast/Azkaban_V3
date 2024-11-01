import { Controller, Get, Logger } from '@nestjs/common';
import { WarcraftService } from './warcraft.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { CharacterDAO } from '@azkaban/warcraft-infrastructure';

@Controller('warcraft')
export class WarcraftController {
	constructor(
		private readonly service: WarcraftService,
		@InjectQueue('warcraft-api') private readonly queue: Queue,
	) {}

	@Get()
	async charactersJob(): Promise<Array<CharacterDAO>> {
		const characters = await this.service.getAllCharacters();
		for (const character of characters) {
			await this.queue.add('warcraft-api', {
				id: character.id,
				region: character.region,
				realm: character.realm,
				name: character.name,
			});
		}
		return characters;
	}
}
