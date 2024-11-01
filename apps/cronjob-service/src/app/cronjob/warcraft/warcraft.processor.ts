import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { WarcraftService } from './warcraft.service';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { ApiDAO, CharacterDAO } from '@azkaban/warcraft-infrastructure';

@Processor('warcraft-api')
export class WarcraftProcessor extends WorkerHost {
	constructor(private readonly service: WarcraftService) {
		super();
	}

	private async onGetCharacterFromApi(data: {
		id: string;
		region: string;
		realm: string;
		name: string;
	}): Promise<Nullable<ApiDAO>> {
		try {
			const { region, realm, name } = data;
			return await this.service.getCharacterFromAPI(region, realm, name);
		} catch (error) {
			Logger.error(error);
			return null;
		}
	}

	private async onCharacterUpdate(
		id: string,
		data: Nullable<ApiDAO>,
	): Promise<Nullable<ApiDAO>> {
		try {
			if (data) {
				await this.service.updateCharacter(id, data);
			} else {
				await this.service.deleteCharacter(id);
			}
		} catch (error) {
			Logger.error(error);
			return null;
		}
	}

	async process(
		job: Job<
			{ id: string; region: string; realm: string; name: string },
			Nullable<ApiDAO>,
			string
		>,
	): Promise<Nullable<ApiDAO>> {
		return await this.onGetCharacterFromApi(job.data);
	}

	@OnWorkerEvent('completed')
	async onCompleted(
		job: Job<Nullable<CharacterDAO>, Nullable<ApiDAO>, string>,
	): Promise<void> {
		try {
			const { id } = job.data;
			const character = job.returnvalue;
			if (character) {
				await this.onCharacterUpdate(id, character);
			} else {
				await this.service.deleteCharacter(id);
			}
		} catch (error) {
			Logger.error({ error });
			const { id } = job.data;
			await this.service.deleteCharacter(id);
		}
	}
}
