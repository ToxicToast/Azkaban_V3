import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import {
    SizeDAO,
    SizeEntity,
    SizeRepository,
    SizeService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class SizeService {
    private readonly infrastructureRepository: SizeRepository;
    private readonly infrastructureService: BaseService;

    constructor(
        @Inject('SIZE_REPOSITORY')
        private readonly sizeRepository: Repository<SizeEntity>,
    ) {
        this.infrastructureRepository = new SizeRepository(this.sizeRepository);
        this.infrastructureService = new BaseService(
            this.infrastructureRepository,
        );
    }

    async getList(limit: number, offset: number): Promise<Array<SizeDAO>> {
        return await this.infrastructureService.getSizeList(limit, offset);
    }

    async getById(id: string): Promise<SizeDAO> {
        return await this.infrastructureService.getSizeById(id);
    }

    async createSize(title: string): Promise<SizeDAO> {
        return await this.infrastructureService.createSize({
            title,
        });
    }

    async updateSize(
        id: string,
        title?: Optional<string>,
        activated_at?: Optional<Date>,
    ): Promise<SizeDAO> {
        if (title !== undefined) {
            await this.infrastructureService.updateTitle(id, title);
        }
        if (activated_at !== undefined) {
            await this.infrastructureService.updateActivatedAt(
                id,
                activated_at,
            );
        }
        return await this.infrastructureService.getSizeById(id);
    }

    async deleteSize(id: string): Promise<SizeDAO> {
        return await this.infrastructureService.deleteSize(id);
    }

    async restoreSize(id: string): Promise<SizeDAO> {
        return await this.infrastructureService.restoreSize(id);
    }
}
