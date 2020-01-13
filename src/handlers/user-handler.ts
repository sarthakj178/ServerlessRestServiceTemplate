import { User } from '../models/user';
import { DbAccessor } from '../db/db-accessor';

export class UserHandler {
    db: DbAccessor;
    constructor(db: DbAccessor) {
        this.db = db;
    }
    async saveUser(user: User): Promise<void> {
        await this.db.saveUser(user);
        return;
    }
    async getUser(userId: string): Promise<User> {
        return await this.db.getUser(userId);
    }
}
