import { Controller, Logger } from '@nestjs/common';
import { ViewerService } from './viewer.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { TwitchViewerTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Nullable } from '@toxictoast/azkaban-base-types';
import { ViewerDAO } from '@azkaban/twitch-infrastructure';

@Controller('viewer')
export class ViewerController {
	constructor(private readonly service: ViewerService) {}

	@MessagePattern(TwitchViewerTopics.LIST)
	async getViewerList(
		@Payload('limit') limit: number,
		@Payload('offset') offset: number,
	) {
		try {
			return await this.service.getList(limit, offset);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.ID)
	async getViewerById(@Payload('id') id: string) {
		try {
			return await this.service.getById(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.JOIN)
	async updateViewerJoin(@Payload('username') username: string) {
		try {
			const viewer = await this.getViewerOrCreate(username);
			const newJoins = viewer.joins + 1;
			return await this.service.updateViewer(viewer.id, newJoins);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.PART)
	async updateViewerPart(@Payload('username') username: string) {
		try {
			const viewer = await this.getViewerOrCreate(username);
			const newParts = viewer.parts + 1;
			return await this.service.updateViewer(
				viewer.id,
				undefined,
				newParts,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.TIMEOUT)
	async updateViewerTimeout(@Payload('username') username: string) {
		try {
			const viewer = await this.getViewerOrCreate(username);
			const newTimeouts = viewer.timeouts + 1;
			return await this.service.updateViewer(
				viewer.id,
				undefined,
				undefined,
				undefined,
				newTimeouts,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.BAN)
	async updateViewerBan(@Payload('username') username: string) {
		try {
			const viewer = await this.getViewerOrCreate(username);
			const newBans = viewer.bans + 1;
			return await this.service.updateViewer(
				viewer.id,
				undefined,
				undefined,
				undefined,
				undefined,
				newBans,
			);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.CREATE)
	async createViewer(@Payload('username') username: string) {
		try {
			return await this.service.createViewer(username);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.DELETE)
	async deleteViewer(@Payload('id') id: string) {
		try {
			return await this.service.deleteViewer(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.RESTORE)
	async restoreViewer(@Payload('id') id: string) {
		try {
			return await this.service.restoreViewer(id);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	private async getViewerOrCreate(display_name: string): Promise<ViewerDAO> {
		try {
			const viewer = await this.getViewerByDisplayName(display_name);
			if (viewer === null) {
				const newViewer =
					await this.createViewerByDisplayName(display_name);
				Logger.debug({ newViewer }, 'Viewer created');
				return newViewer;
			}
			Logger.debug({ viewer }, 'Viewer found');
			return viewer;
		} catch (error) {
			return null;
		}
	}

	private async getViewerByDisplayName(
		display_name: string,
	): Promise<Nullable<ViewerDAO>> {
		try {
			return await this.service.getByDisplayName(display_name);
		} catch (error) {
			return null;
		}
	}

	private async createViewerByDisplayName(
		display_name: string,
	): Promise<ViewerDAO> {
		try {
			return await this.service.createViewer(display_name);
		} catch (error) {
			return null;
		}
	}
}
