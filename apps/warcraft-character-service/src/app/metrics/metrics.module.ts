import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
	imports: [
		PrometheusModule.register({
			defaultMetrics: {
				enabled: true,
			},
			defaultLabels: {
				app: 'warcraft-character-service',
			},
			path: '/metrics',
		}),
	],
})
export class MetricsModule {}
