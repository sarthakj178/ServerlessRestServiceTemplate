import { PingHandler } from '../handlers/ping-handler';
import { UserHandler } from '../handlers/user-handler';
import { DynamoDBAccessor } from '../db/dynamodb-accessor';
const dynamoDBAccessor = new DynamoDBAccessor();
const pingHandler = new PingHandler();
const userHandler = new UserHandler(dynamoDBAccessor);

export const ping = async () => {
    return {
        statusCode: 200,
        body: await pingHandler.ping()
    };
};
export const pingWithInput = async event => {
    console.log('request received', event.queryStringParameters);
    if (event.queryStringParameters.x) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                y: await pingHandler.ping_with_input(event.queryStringParameters.x)
            })
        };
    } else {
        return {
            statusCode: 400,
            body: 'Query string Parameter `x` is missing or empty'
        };
    }
};

export const saveUser = async event => {
    console.log('save user request', event.body);
    try {
        await userHandler.saveUser(event.body);
        return {
            statusCode: 200,
            body: 'Saved user'
        };
    } catch (error) {
        return {
            statusCode: 500
        };
    }
};
export const getUser = async event => {
    console.log('get user request', event.queryStringParameters.userId);
    try {
        const user = await userHandler.getUser(event.queryStringParameters.userId);
        return {
            statusCode: 200,
            body: JSON.stringify({ user })
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500
        };
    }
};
