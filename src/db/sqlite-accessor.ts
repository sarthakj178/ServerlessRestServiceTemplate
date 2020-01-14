import { DbAccessor } from './db-accessor';
import { User } from '../models/user';
const { Sequelize, Model } = require('sequelize');

class SqliteUser extends Model {}

export class SQLiteAccessor implements DbAccessor {
    db: any;
    User: any;
    constructor() {
        this.db = new Sequelize('sqlite::memory:');

        this.User = this.db.define('Users', {
            userId: {
                type: Sequelize.STRING,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING
            }
        });
    }

    async getUser(userId: string): Promise<User> {
        const res = await this.User.findOne({
            where: {
                userId: userId
            }
        });
        return new User(res.userId, res.name);
    }

    async saveUser(user: User): Promise<void> {
        await this.User.sync();
        await this.User.create({ userId: user.userId, name: user.name });
        return;
    }
}
