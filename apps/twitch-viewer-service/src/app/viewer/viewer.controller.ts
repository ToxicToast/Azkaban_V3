import { Controller } from '@nestjs/common';
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
	async updateViewerJoin(@Payload('display_name') display_name: string) {
		try {
			const viewer = await this.getViewerByDisplayName(display_name);
			if (!viewer) {
				return await this.createViewerByDisplayName(display_name);
			}
			const newJoins = viewer.joins + 1;
			return await this.service.updateViewer(viewer.id, newJoins);
		} catch (error) {
			throw new RpcException(error);
		}
	}

	@MessagePattern(TwitchViewerTopics.PART)
	async updateViewerPart(@Payload('display_name') display_name: string) {
		try {
			const viewer = await this.getViewerByDisplayName(display_name);
			if (!viewer) {
				return await this.createViewerByDisplayName(display_name);
			}
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
	async updateViewerTimeout(@Payload('display_name') display_name: string) {
		try {
			const viewer = await this.getViewerByDisplayName(display_name);
			if (!viewer) {
				return await this.createViewerByDisplayName(display_name);
			}
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
	async updateViewerBan(@Payload('display_name') display_name: string) {
		try {
			const viewer = await this.getViewerByDisplayName(display_name);
			if (!viewer) {
				return await this.createViewerByDisplayName(display_name);
			}
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

	private async getViewerByDisplayName(
		display_name: string,
	): Promise<Nullable<ViewerDAO>> {
		try {
			const viewer = await this.service.getByDisplayName(display_name);
			return viewer ?? null;
		} catch (error) {
			throw new RpcException(error);
		}
	}

	private async createViewerByDisplayName(
		display_name: string,
	): Promise<ViewerDAO> {
		try {
			return await this.service.createViewer(display_name);
		} catch (error) {
			throw new RpcException(error);
		}
	}
}
