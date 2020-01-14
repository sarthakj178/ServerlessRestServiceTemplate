import { DbAccessor } from './db-accessor';
import { User } from '../models/user';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class DynamoDBAccessor implements DbAccessor {
    docClient: DocumentClient;
    constructor() {
        this.docClient = new DocumentClient();
    }

    async getUser(userId: string): Promise<User> {
        console.log('table name', process.env.DynamoDBTableName);
        const res = await this.docClient
            .get({
                TableName: process.env.DynamoDBTableName,
                Key: {
                    userId: userId
                }
            })
            .promise();

        if (!res || !res.Item) {
            return null;
        }
        return new User(res.Item['userId'], res.Item['name']);
    }

    async saveUser(user: User): Promise<void> {
        await this.docClient
            .put({
                TableName: process.env.DynamoDBTableName,
                Item: user
            })
            .promise();
        return;
    }
}
