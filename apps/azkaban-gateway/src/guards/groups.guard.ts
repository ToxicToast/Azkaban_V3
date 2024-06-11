import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GroupsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const groups = this.reflector.get<string[]>(
            'groups',
            context.getHandler(),
        );
        if (!groups) {
            return false;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userGroups = user?.groups ?? [];
        return groups.some((group) => {
            return userGroups.includes(group);
        });
    }
}
