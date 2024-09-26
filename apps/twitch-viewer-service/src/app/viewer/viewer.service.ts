import { Inject, Injectable } from '@nestjs/common';
import {
	ViewerDAO,
	ViewerEntity,
	ViewerRepository,
	ViewerService as BaseService,
} from '@azkaban/twitch-infrastructure';
import { Repository } from 'typeorm';
import { Nullable, Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class ViewerService {
	private readonly infrastructureRepository: ViewerRepository;
	private readonly infrastructureService: BaseService;

	constructor(
		@Inject('VIEWER_REPOSITORY')
		private readonly viewerRepository: Repository<ViewerEntity>,
	) {
		this.infrastructureRepository = new ViewerRepository(
			this.viewerRepository,
		);
		this.infrastructureService = new BaseService(
			this.infrastructureRepository,
		);
	}

	async getList(limit: number, offset: number): Promise<Array<ViewerDAO>> {
		return await this.infrastructureService.getViewerList(limit, offset);
	}

	async getById(id: string): Promise<ViewerDAO> {
		return await this.infrastructureService.getViewerById(id);
	}

	async getByDisplayName(display_name: string): Promise<ViewerDAO> {
		return await this.infrastructureService.getViewerByDisplayName(
			display_name,
		);
	}

	async createViewer(display_name: string): Promise<ViewerDAO> {
		return await this.infrastructureService.createViewer({
			display_name,
		});
	}

	async updateViewer(
		id: string,
		joins?: Optional<number>,
		parts?: Optional<number>,
		messages?: Optional<number>,
		timeouts?: Optional<number>,
		bans?: Optional<number>,
		minutes_watched?: Optional<number>,
		lastseen_at?: Optional<Nullable<Date>>,
	): Promise<ViewerDAO> {
		if (joins !== undefined) {
			await this.infrastructureService.updateJoins(id, joins);
		}
		if (parts !== undefined) {
			await this.infrastructureService.updateParts(id, parts);
		}
		if (messages !== undefined) {
			await this.infrastructureService.updateMessages(id, messages);
		}
		if (timeouts !== undefined) {
			await this.infrastructureService.updateTimeouts(id, timeouts);
		}
		if (bans !== undefined) {
			await this.infrastructureService.updateBans(id, bans);
		}
		if (minutes_watched !== undefined) {
			await this.infrastructureService.updateMinutesWatched(
				id,
				minutes_watched,
			);
		}
		if (lastseen_at !== undefined) {
			await this.infrastructureService.updateLastSeenAt(id, lastseen_at);
		}
		return await this.infrastructureService.getViewerById(id);
	}

	async deleteViewer(id: string): Promise<ViewerDAO> {
		return await this.infrastructureService.deleteViewer(id);
	}

	async restoreViewer(id: string): Promise<ViewerDAO> {
		return await this.infrastructureService.restoreViewer(id);
	}
}
