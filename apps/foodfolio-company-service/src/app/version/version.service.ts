import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
    constructor(@Inject('APP_VERSION') private readonly appVersion: string) {}

    getVersion(): string {
        return this.appVersion;
    }
}
