import { DbAccessor } from './db-accessor';
import { User } from '../models/user';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class DynamoDBAccessor implements DbAccessor {
    docClient: DocumentClient;
    constructor() {
        this.docClient = new DocumentClient();
    }

    async getUser(userId: string): Promise<User> {
        const res = await this.docClient
            .get({
                TableName: 'Users',
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
                TableName: 'Users',
                Item: user
            })
            .promise();
        return;
    }
}
