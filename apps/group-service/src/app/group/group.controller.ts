import { Controller } from '@nestjs/common';
import { GroupService } from './group.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { GroupsTopics } from '@toxictoast/azkaban-broker-rabbitmq';
import { Optional } from '@toxictoast/azkaban-base-types';

@Controller('group')
export class GroupController {
    constructor(private readonly service: GroupService) {}

    @MessagePattern(GroupsTopics.LIST)
    async getGroupList(
        @Payload('limit') limit: number,
        @Payload('offset') offset: number,
    ) {
        try {
            return await this.service.getGroups(limit, offset);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(GroupsTopics.ID)
    async getGroupById(@Payload('id') id: string) {
        try {
            return await this.service.getGroupById(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(GroupsTopics.CREATE)
    async createGroup(@Payload('title') title: string) {
        try {
            return await this.service.createGroup(title);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(GroupsTopics.UPDATE)
    async updateGroup(
        @Payload('id') id: string,
        @Payload('title') title?: Optional<string>,
        @Payload('slug') slug?: Optional<string>,
        @Payload('active') active?: Optional<boolean>,
    ) {
        try {
            return await this.service.updateGroup(id, title, slug, active);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(GroupsTopics.DELETE)
    async deleteGroup(@Payload('id') id: string) {
        try {
            return await this.service.deleteGroup(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @MessagePattern(GroupsTopics.RESTORE)
    async restoreGroup(@Payload('id') id: string) {
        try {
            return await this.service.restoreGroup(id);
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
