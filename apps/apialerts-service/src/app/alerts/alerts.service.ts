import { Inject, Injectable, Logger } from '@nestjs/common';
import { ApiAlertsHelper } from '@toxictoast/azkaban-base-helpers';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class AlertsService {
  private readonly client: ApiAlertsHelper;

  constructor(@Inject('MAGPIE_KEY') private readonly apiKey: string) {
    this.client = ApiAlertsHelper.getInstance(this.apiKey);
  }

  public sendAlert(
    message: string,
    tags?: Optional<Array<string>>,
    link?: Optional<string>
  ): void {
    Logger.debug({ message, tags, link });
    this.client.send({
      message,
      tags,
      link,
    });
  }
}
