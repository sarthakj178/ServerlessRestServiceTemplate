import { UserAppsHandler } from '../handlers/user-apps-handler';
import { DynamoDBAccessor } from '../db/dynamodb-accessor';
const dynamoDBAccessor = new DynamoDBAccessor();
const userAppsHandler = new UserAppsHandler(dynamoDBAccessor);

export const getUserAppsMetadata = async event => {
    console.log(event.queryStringParameters);
    try {
        const res = await userAppsHandler.getUserAppsMetadata(event.queryStringParameters.userId, event.queryStringParameters.workplaceId, event.queryStringParameters.requestingUserId);
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        };
    } catch (error) {
        console.error('Error while getting user apps', error);
        return {
            statusCode: 500
        };
    }
};
export const getAppUsers = async event => {
    console.log(event.body);
    try {
        const res = await userAppsHandler.getAppUsers(event.body.appId, event.body.permissions, event.body.requestingUserId);
        return {
            statusCode: 200,
            body: JSON.stringify(res)
        };
    } catch (error) {
        console.error('Error while getting app users', error);
        return {
            statusCode: 500
        };
    }
};
export const addUserToApp = async event => {
    console.log(event.body);
    try {
        await userAppsHandler.addUserToApp(event.body.appId, event.body.workplaceId, event.body.userId, event.body.permissions, event.body.requestingUserId);
        return {
            statusCode: 200,
            body: ''
        };
    } catch (error) {
        console.error('Error while adding user to app', error);
        return {
            statusCode: 500
        };
    }
};
export const addUsersToApp = async event => {
    console.log(event.body);
    try {
        await userAppsHandler.addUsersToApp(event.body.appId, event.body.workplaceId, event.body.userIds, event.body.permissions, event.body.requestingUserId);
        return {
            statusCode: 200,
            body: ''
        };
    } catch (error) {
        console.error('Error while adding users to app', error);
        return {
            statusCode: 500
        };
    }
};
export const updateUserAppPermissions = async event => {
    console.log(event.body);
    try {
        await userAppsHandler.updateUserAppPermissions(event.body.appId, event.body.workplaceId, event.body.userId, event.body.permissions, event.body.requestingUserId);
        return {
            statusCode: 200,
            body: ''
        };
    } catch (error) {
        console.error('Error while updating user permissions', error);
        return {
            statusCode: 500
        };
    }
};
export const removeUserFromApp = async event => {
    console.log(event.body);
    try {
        await userAppsHandler.removeUserFromApp(event.body.appId, event.body.workplaceId, event.body.userId, event.body.requestingUserId);
        return {
            statusCode: 200,
            body: ''
        };
    } catch (error) {
        console.error('Error while remove user from app', error);
        return {
            statusCode: 500
        };
    }
};
export const removeUserFromAllApps = async event => {
    console.log(event.body);
    try {
        await userAppsHandler.removeUserFromAllApps(event.body.userId, event.body.workplaceId, event.body.requestingUserId);
        return {
            statusCode: 200,
            body: ''
        };
    } catch (error) {
        console.error('Error while remove user from all apps', error);
        return {
            statusCode: 500
        };
    }
};
