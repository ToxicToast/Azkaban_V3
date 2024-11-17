import { Processor, WorkerHost } from '@nestjs/bullmq';
import { ViewerService } from './viewer.service';
import { Job } from 'bullmq';
import { ViewerDAO } from '@azkaban/twitch-infrastructure';

@Processor('twitch-viewer')
export class ViewerProcessor extends WorkerHost {
	constructor(private readonly service: ViewerService) {
		super();
	}

	async process(job: Job<ViewerDAO, void, string>): Promise<void> {
		const viewer = job.data;
		const olderThanTwoWeeks =
			await this.service.isViewerLastSeen2Weeks(viewer);
		if (olderThanTwoWeeks) {
			await this.service.deleteViewer(viewer.id);
		}
	}
}
