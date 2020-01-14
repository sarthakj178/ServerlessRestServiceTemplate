import { AppMetadata } from '../models/app-metadata';
import { DbAccessor } from '../db/db-accessor';
import { Permission } from 'aws-sdk/clients/appstream';
import { UserMetadata } from 'aws-sdk/clients/elastictranscoder';

export class UserAppsHandler {
    db: DbAccessor;
    constructor(db: DbAccessor) {
        this.db = db;
    }
    async getUserAppsMetadata(userId: string, workplaceId: string, requestingUserId: string): Promise<AppMetadata[]> {
        return null;
    }
    async getAppUsers(appId: string, permissions: Set<Permission>, requestingUserId: string): Promise<UserMetadata[]> {
        return null;
    }
    async addUserToApp(appId: string, workplaceId: string, userId: string, permissions: Set<Permission>, requestingUserId: string): Promise<void> {}
    async addUsersToApp(appId: string, workplaceId: string, userIds: string[], permissions: Set<Permission>, requestingUserId: string): Promise<void> {}
    async updateUserAppPermissions(appId: string, workplaceId: string, userId: string, permissions: Set<Permission>, requestingUserId: string): Promise<void> {}
    async removeUserFromApp(appId: string, workplaceId: string, userId: string, requestingUserId: string): Promise<void> {}
    async removeUserFromAllApps(userId: string, workplaceId: string, requestingUserId: string): Promise<void> {}
}
