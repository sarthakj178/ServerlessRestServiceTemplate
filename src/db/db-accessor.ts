import { User } from '../models/user';
export interface DbAccessor {
    getUser(userId: string): Promise<User>;
    saveUser(user: User): Promise<void>;
}
