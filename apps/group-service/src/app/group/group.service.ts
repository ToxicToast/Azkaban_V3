import { Inject, Injectable } from '@nestjs/common';
import {
    GroupDAO,
    GroupEntity,
    GroupRepository,
    GroupService as BaseService,
} from '@azkaban/group-infrastructure';
import { Repository } from 'typeorm';
import { Optional } from '@toxictoast/azkaban-base-types';

@Injectable()
export class GroupService {
    private readonly infrastructureRepository: GroupRepository;
    private readonly infrastructureService: BaseService;

    constructor(
        @Inject('GROUP_REPOSITORY')
        private readonly groupRepository: Repository<GroupEntity>,
    ) {
        this.infrastructureRepository = new GroupRepository(
            this.groupRepository,
        );
        this.infrastructureService = new BaseService(
            this.infrastructureRepository,
        );
    }

    async getGroups(limit: number, offset: number): Promise<Array<GroupDAO>> {
        return await this.infrastructureService.getGroupList(limit, offset);
    }

    async getGroupById(id: string): Promise<GroupDAO> {
        return await this.infrastructureService.getGroupById(id);
    }

    async createGroup(title: string): Promise<GroupDAO> {
        return await this.infrastructureService.createGroup({
            title,
        });
    }

    async updateGroup(
        id: string,
        title?: Optional<string>,
        slug?: Optional<string>,
        active?: Optional<boolean>,
    ): Promise<GroupDAO> {
        if (title) {
            await this.infrastructureService.updateTitle(id, title);
        }
        if (slug) {
            await this.infrastructureService.updateSlug(id, slug);
        }
        if (active) {
            await this.infrastructureService.updateActive(id, active);
        }
        return await this.infrastructureService.getGroupById(id);
    }

    deleteGroup(id: string): Promise<GroupDAO> {
        return this.infrastructureService.deleteGroup(id);
    }

    restoreGroup(id: string): Promise<GroupDAO> {
        return this.infrastructureService.restoreGroup(id);
    }
}
