import { ViewerService as DomainService } from '@azkaban/twitch-domain';
import { ViewerRepository } from '../repositories';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';
import { ViewerDAO } from '../../dao';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateViewerDTO } from '@azkaban/twitch-infrastructure';

export class ViewerService {
	private readonly domainService: DomainService;

	constructor(private readonly repository: ViewerRepository) {
		this.domainService = new DomainService(repository);
	}

	async getViewerList(
		limit?: Optional<number>,
		offset?: Optional<number>,
	): Promise<Array<ViewerDAO>> {
		const result = await this.domainService.getViewers(limit, offset);
		if (result.isSuccess) {
			return result.value;
		} else {
			return [];
		}
	}

	async getViewerById(id: string): Promise<ViewerDAO> {
		const result = await this.domainService.getViewerById(id);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async getViewerByDisplayName(display_name: string): Promise<ViewerDAO> {
		const result =
			await this.domainService.getViewerByDisplayName(display_name);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new NotFoundException(errorMessage);
		}
	}

	async createViewer(data: CreateViewerDTO): Promise<ViewerDAO> {
		const result = await this.domainService.createViewer(data);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateLastSeenAt(
		id: string,
		lastseen_at: Nullable<Date>,
	): Promise<ViewerDAO> {
		const result = await this.domainService.updateLastSeenAt(
			id,
			lastseen_at,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateJoins(id: string, joins: number): Promise<ViewerDAO> {
		const result = await this.domainService.updateJoins(id, joins);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateParts(id: string, parts: number): Promise<ViewerDAO> {
		const result = await this.domainService.updateParts(id, parts);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateMessages(id: string, messages: number): Promise<ViewerDAO> {
		const result = await this.domainService.updateMessages(id, messages);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateTimeouts(id: string, timeouts: number): Promise<ViewerDAO> {
		const result = await this.domainService.updateTimeouts(id, timeouts);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateBans(id: string, bans: number): Promise<ViewerDAO> {
		const result = await this.domainService.updateBans(id, bans);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}

	async updateMinutesWatched(
		id: string,
		minutes_watched: number,
	): Promise<ViewerDAO> {
		const result = await this.domainService.updateMinutesWatched(
			id,
			minutes_watched,
		);
		if (result.isSuccess) {
			return result.value;
		} else {
			const errorMessage = result.errorValue;
			throw new BadRequestException(errorMessage);
		}
	}
}
