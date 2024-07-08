import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.register({
            store: 'memory',
        }),
    ],
    exports: [CacheModule],
})
export class CachingModule {}
