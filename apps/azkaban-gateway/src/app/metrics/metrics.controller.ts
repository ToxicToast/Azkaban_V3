import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Res } from '@nestjs/common';
import { PrometheusController } from '@willsoto/nestjs-prometheus';

@ApiTags('monitoring')
@Controller('metrics')
export class MetricsController extends PrometheusController {
  @Get()
  index(@Res({ passthrough: true }) response: Response) {
    if (response !== undefined) {
      return super.index(response);
    }
  }
}
