import { DbAccessor } from './db-accessor';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class DynamoDBAccessor implements DbAccessor {
    docClient: DocumentClient;
    constructor() {
        this.docClient = new DocumentClient();
    }
}
