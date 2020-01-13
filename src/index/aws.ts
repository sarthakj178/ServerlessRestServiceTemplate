import { PingHandler } from '../handlers/ping-handler';
const pingHandler = new PingHandler();

export const ping = async () => {
    return {
        statusCode: 200,
        body: await pingHandler.ping()
    };
};
export const ping_with_input = async event => {
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
