import { Inject, Injectable } from '@nestjs/common';
import { Optional } from '@toxictoast/azkaban-base-types';
import {
    TypeDAO,
    TypeEntity,
    TypeRepository,
    TypeService as BaseService,
} from '@azkaban/foodfolio-infrastructure';
import { Repository } from 'typeorm';

@Injectable()
export class TypeService {
    private readonly infrastructureRepository: TypeRepository;
    private readonly infrastructureService: BaseService;

    constructor(
        @Inject('TYPE_REPOSITORY')
        private readonly typeRepository: Repository<TypeEntity>,
    ) {
        this.infrastructureRepository = new TypeRepository(this.typeRepository);
        this.infrastructureService = new BaseService(
            this.infrastructureRepository,
        );
    }

    async getList(limit: number, offset: number): Promise<Array<TypeDAO>> {
        return await this.infrastructureService.getTypeList(limit, offset);
    }

    async getById(id: string): Promise<TypeDAO> {
        return await this.infrastructureService.getTypeById(id);
    }

    async createType(title: string): Promise<TypeDAO> {
        return await this.infrastructureService.createType({
            title,
        });
    }

    async updateType(
        id: string,
        title?: Optional<string>,
        activated_at?: Optional<Date>,
    ): Promise<TypeDAO> {
        if (title !== undefined) {
            await this.infrastructureService.updateTitle(id, title);
        }
        if (activated_at !== undefined) {
            await this.infrastructureService.updateActivatedAt(
                id,
                activated_at,
            );
        }
        return await this.infrastructureService.getTypeById(id);
    }

    async deleteType(id: string): Promise<TypeDAO> {
        return await this.infrastructureService.deleteType(id);
    }

    async restoreType(id: string): Promise<TypeDAO> {
        return await this.infrastructureService.restoreType(id);
    }
}
