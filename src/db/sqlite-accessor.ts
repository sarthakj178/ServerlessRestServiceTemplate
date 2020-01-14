import { DbAccessor } from './db-accessor';
const { Sequelize, Model } = require('sequelize');

class SqliteUser extends Model {}

export class SQLiteAccessor implements DbAccessor {
    constructor() {}
}
